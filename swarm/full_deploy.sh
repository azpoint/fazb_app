#!/bin/bash

DEPLOY_YML=~/sites/fazb-app/stacks/fazb_deploy.yml
NGINX_CONF=~/sites/fazb-app/configs/nginx.conf
BASE_URL="https://raw.githubusercontent.com/azpoint/fazb_app/refs/heads/main/swarm"
STACK_NAME=fazb

download_files() {
  echo "📥 Downloading latest deployment files from GitHub..."
  curl -fsSL -o "$DEPLOY_YML" "$BASE_URL/fazb_deploy.yml" \
    && echo "✅ Updated: fazb_deploy.yml" \
    || echo "❌ Failed to update fazb_deploy.yml"

  curl -fsSL -o "$NGINX_CONF" "$BASE_URL/nginx.conf" \
    && echo "✅ Updated: nginx.conf" \
    || echo "❌ Failed to update nginx.conf"
}

write_tag_to_yml() {
  local TAG_LINE="  image: clonit/fazb-app:$1"
  sed -i "s|^[[:space:]]*image:[[:space:]]*clonit\/fazb-app:[^[:space:]]*|$TAG_LINE|" "$DEPLOY_YML"
}

is_image_present() {
  docker image inspect "$1" > /dev/null 2>&1
}

deploy_stack() {
  echo "🚀 Deploying stack..."
  docker stack deploy -c "$DEPLOY_YML" "$STACK_NAME"
}

# ---------------------------------------------------------------------------

ACTION="$1"
TAG="$2"
IMAGE_TAG="clonit/fazb-app:$TAG"

case "$ACTION" in
  update)
    if [ -z "$TAG" ]; then
      echo "❌ No image tag supplied."
      echo "Usage: $0 update <tag>"
      exit 1
    fi

    download_files
    write_tag_to_yml "$TAG"

    if is_image_present "$IMAGE_TAG"; then
      echo "🟢 Image $IMAGE_TAG is already locally available."
      echo "ℹ️  If you intend to replace the image, use \"replace\" as the first argument."
    else
      echo "⬇️ Pulling Docker image: $IMAGE_TAG"
      docker pull "$IMAGE_TAG"
    fi

    deploy_stack
    ;;

  replace)
    if [ -z "$TAG" ]; then
      echo "❌ No image tag supplied."
      echo "Usage: $0 replace <tag>"
      exit 1
    fi

    echo "🛑 Stopping current deployment..."
    docker stack rm "$STACK_NAME"
    echo "⏳ Waiting 15 seconds for services to stop..."
    sleep 15

    echo "🧹 Removing local image: $IMAGE_TAG"
    docker image rm "$IMAGE_TAG"

    echo "⏳ Waiting 5 seconds before pulling image again..."
    sleep 5

    echo "⬇️ Pulling Docker image: $IMAGE_TAG"
    docker pull "$IMAGE_TAG"

    deploy_stack
    ;;

  rollback)
    if [ -z "$TAG" ]; then
      echo "❌ No image tag supplied."
      echo "Usage: $0 rollback <tag>"
      exit 1
    fi

    if is_image_present "$IMAGE_TAG"; then
      echo "🔁 Rolling back to $IMAGE_TAG"
    else
      echo "⬇️ Attempting to pull $IMAGE_TAG..."
      if docker pull "$IMAGE_TAG"; then
        echo "✅ Pulled image $IMAGE_TAG"
      else
        echo "❌ Image not found locally and could not be downloaded. Rollback aborted."
        exit 1
      fi
    fi

    write_tag_to_yml "$TAG"
    deploy_stack
    ;;

  *)
    echo "ℹ️ No valid argument provided. Proceeding with default behavior..."
    download_files
    deploy_stack
    ;;
esac
