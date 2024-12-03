# Base image with Node.js
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install expo-cli locally (no global installation)
RUN npx expo-cli --version

# Copy the rest of the app
COPY . .

# Expose the development port
EXPOSE 19000

# Start the Expo server using local CLI
CMD ["npx", "expo", "start", "--tunnel"]
