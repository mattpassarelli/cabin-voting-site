# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json package-lock.json /app/

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . /app/

# Build the React application
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Expose the port that the app runs on
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build"]
