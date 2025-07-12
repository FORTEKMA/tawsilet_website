#!/bin/bash

# Get current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

echo "Current branch: $CURRENT_BRANCH"

# Determine which environment file to use
case $CURRENT_BRANCH in
    "dev"|"development")
        SOURCE_FILE=".env.development"
        echo "Setting up development environment..."
        ;;
    "main"|"master")
        SOURCE_FILE=".env.production"
        echo "Setting up production environment..."
        ;;
    *)
        SOURCE_FILE=".env.development"
        echo "Unknown branch \"$CURRENT_BRANCH\", using development environment..."
        ;;
esac

# Copy the appropriate environment file
if [ -f "$SOURCE_FILE" ]; then
    cp "$SOURCE_FILE" .env
    echo "✅ Environment file copied from $SOURCE_FILE to .env"
else
    echo "❌ Source environment file $SOURCE_FILE not found!"
    exit 1
fi 