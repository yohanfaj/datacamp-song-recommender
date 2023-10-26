# Use the official Python image as the base image
FROM python:3.7-slim

# Set the working directory
WORKDIR ./flask_server

# Copy the requirements file into the container
COPY ./flask_server/requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Expose the port that your Flask app listens on
EXPOSE 5000

# Copy the frontend code into the container
COPY song-recommender/ /song-recommender

# Install Node.js and build the React app
RUN cd /song-recommender && npm run build

# Start the Flask app with Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "flask_server.app:app"]
