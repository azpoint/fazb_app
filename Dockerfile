FROM node:22.14.0-alpine AS base

FROM base AS deps
# to avoid possible compatibility issues in NextJS
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app

# Declare build args
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY

# Set env vars so Next.js build can pick them up
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN chown -R nextjs:nodejs ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]