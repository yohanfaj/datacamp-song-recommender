# Use the official Python image as the base image
FROM python:3.7-slim

# Set the working directory
WORKDIR ./app

# Copy the requirements file into the container
COPY ./flask_server/requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Copy the render.yaml file
COPY ./render.yaml .

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app with Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "flask_server.app:app"]


######################################################################"

# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR ./app

# Copy package.json and package-lock.json into the container
COPY ./song-recommender/package*.json ./

# Install the required Node.js packages
RUN npm install

# Copy the rest of the application files
COPY ./song-recommender ./

# Expose the port that your Node.js app listens on
EXPOSE 3000

# Start the Node.js app
CMD [ "npm", "build start" ]
