#!/bin/bash

SCRIPT_OUT=~/sites/fazb-app/full_deploy.sh
BASE_URL="https://raw.githubusercontent.com/azpoint/fazb_app/refs/heads/main/swarm"

curl -fsSL -o  "$SCRIPT_OUT" "$BASE_URL/full_deploy.sh" \
 && echo "✅ Updated: full_deploy.sh" \
 || echo "❌ Failed to update full_deploy.sh"

curl -fsSL -o ~/sites/fazb-app/stacks/fazb_deploy.yml "$BASE_URL/fazb_deploy.yml" \
  && echo "✅ Updated: fazb_deploy.yml" \
  || echo "❌ Failed to update fazb_deploy.yml"