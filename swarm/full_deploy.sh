#!/bin/bash

DEPLOY_YML=~/sites/fazb-app/stacks/fazb_deploy.yml
NGINX_CONF=~/sites/fazb-app/configs/nginx.conf
FULL_DEPLOY=~/sites/fazb-app/configs/full_deploy.sh
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

	curl -fsSL -o "$FULL_DEPLOY" "$BASE_URL/full_deploy.sh" \
	&& echo "✅ Updated: full_deploy.sh" \
    || echo "❌ Failed to update full_deploy.sh"
}

get_image_tag_from_yml() {
  grep 'image:' "$DEPLOY_YML" | awk -F 'image:' '{print $2}' | tr -d ' '
}

is_image_present() {
  docker image inspect "$1" > /dev/null 2>&1
}

deploy_stack() {
  echo "🚀 Deploying stack..."
  docker stack deploy -c "$DEPLOY_YML" "$STACK_NAME"
}

case "$1" in
  update)
    download_files
    IMAGE_TAG=$(get_image_tag_from_yml)

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
    IMAGE_TAG=$(get_image_tag_from_yml)

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
    if [ -z "$2" ]; then
      echo "❌ No image tag provided for rollback."
      echo "Usage: $0 rollback <tag>"
      exit 1
    fi

    ROLLBACK_TAG="clonit/fazb-app:$2"

    if is_image_present "$ROLLBACK_TAG"; then
      echo "🔁 Rolling back to $ROLLBACK_TAG"
    else
      echo "⬇️ Attempting to pull $ROLLBACK_TAG..."
      if docker pull "$ROLLBACK_TAG"; then
        echo "✅ Pulled image $ROLLBACK_TAG"
      else
        echo "❌ Image not found locally and could not be downloaded. Rollback aborted."
        exit 1
      fi
    fi

    echo "🛠 Updating image tag in deploy file..."
    sed -i "s|clonit/fazb-app:.*|$ROLLBACK_TAG|g" "$DEPLOY_YML"

    deploy_stack
    ;;

  *)
    echo "ℹ️ No valid argument provided. Proceeding with default behavior..."
    download_files
    deploy_stack
    ;;
esac

