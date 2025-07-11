#!/bin/bash

# Check if an argument was passed
if [ "$#" -eq 1 ]; then
  NEW_TAG="$1"
  echo "📦 New image tag provided: $NEW_TAG"

  echo "⬇️ Pulling Docker image: clonit/fazb-app:$NEW_TAG"
  docker pull clonit/fazb-app:$NEW_TAG
else
  echo "ℹ️ No image tag provided. Skipping Docker image pull."
fi

echo "📥 Downloading latest deployment files from GitHub..."

# Define base path for reuse
BASE_URL="https://raw.githubusercontent.com/azpoint/fazb_app/refs/heads/main/swarm"

curl -fsSL -o ~/sites/fazb-app/stacks/fazb_deploy.yml "$BASE_URL/fazb_deploy.yml" \
  && echo "✅ Updated: fazb_deploy.yml" \
  || echo "❌ Failed to update fazb_deploy.yml"

curl -fsSL -o ~/sites/fazb-app/configs/nginx.conf "$BASE_URL/nginx.conf" \
  && echo "✅ Updated: nginx.conf" \
  || echo "❌ Failed to update nginx.conf"

# Update image tag in YAML if argument was passed
if [ -n "$NEW_TAG" ]; then
  echo "🛠 Updating image tag in fazb_deploy.yml..."
  sed -i "s|clonit/fazb-app:.*|clonit/fazb-app:$NEW_TAG|g" ~/sites/fazb-app/stacks/fazb_deploy.yml
  echo "✅ Image tag updated to $NEW_TAG"
fi

echo "⏳ Waiting 15 seconds before deployment..."
sleep 15

echo "🚀 Deploying stack..."
docker stack deploy -c ~/sites/fazb-app/stacks/fazb_deploy.yml fazb
