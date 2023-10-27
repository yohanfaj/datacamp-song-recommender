# Use the official Python image as the base image
FROM python:3.7-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY ./flask_server/requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the Flask backend code
COPY ./flask_server/ ./flask_server/

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app with Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "flask_server.app:app"]
