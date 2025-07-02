#!/bin/sh

# Load secrets into environment variables
export DATABASE_URL=$(cat /run/secrets/database_url)
export JWT_SECRET=$(cat /run/secrets/jwt_secret)
export SYS_ADMIN_EMAIL=$(cat /run/secrets/sys_admin_email)
export SYS_ADMIN_PASSWORD=$(cat /run/secrets/sys_admin_password)
export ADMIN_MAIL_VERIF_PASSWORD=$(cat /run/secrets/admin_mail_verif_password)
export RECAPTCHA_SECRET_KEY=$(cat /run/secrets/recaptcha_secret_key)

exec "$@"