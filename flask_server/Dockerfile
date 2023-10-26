# Use the official Python image as the base image
FROM python:3.7-slim

# Set the working directory
WORKDIR ./flask_server

# Copy the requirements file into the container
COPY ./flask_server/requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app
CMD ["python", "./flask_server/app.py"]