#!/bin/zsh

# Assign the current timestamp in YYYYMMDDHHmm format
TIMESTAMP=$(date +"%Y%m%d%H%M")
echo "Timestamp: $TIMESTAMP"

# Navigate to the project directory
echo "Building Django container..."
cd ./cabin_site || { echo "Failed to change directory to ./cabin_site"; exit 1; }

# Define image names
IMAGE_NAME_DJANGO="mattpassarelli/cabin_voting_site:backend-$TIMESTAMP"
LATEST_TAG_DJANGO="mattpassarelli/cabin_voting_site:backend"

# Build the Docker image with both tags
docker build -t $IMAGE_NAME_DJANGO -t $LATEST_TAG_DJANGO .

# Push both the timestamped and latest images
echo "Pushing image $IMAGE_NAME_DJANGO and $LATEST_TAG_DJANGO to Docker Hub..."
docker push $IMAGE_NAME_DJANGO
docker push $LATEST_TAG_DJANGO

# Navigate to React Frontend directory
echo "Building React frontend container..."
cd ../frontend || { echo "Failed to change directory to ../frontend"; exit 1; }

# Define image names
IMAGE_NAME_REACT="mattpassarelli/cabin_voting_site:frontend-$TIMESTAMP"
LATEST_TAG_REACT="mattpassarelli/cabin_voting_site:frontend"

# Build the Docker image with both tags
docker build -t $IMAGE_NAME_REACT -t $LATEST_TAG_REACT --build-arg REACT_APP_BACKEND_URL=https://cabin-db.mattpassarelli.net .

# Push both the timestamped and latest images
echo "Pushing image $IMAGE_NAME_DJANGO and $LATEST_TAG_DJANGO to Docker Hub..."B
# docker push $IMAGE_NAME_DJANGO
# docker push $LATEST_TAG_DJANGO
# docker push $IMAGE_NAME_REACT
# docker push $LATEST_TAG_REACT

echo "Done!"
