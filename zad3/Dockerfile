FROM openjdk:17-jdk-slim

# Install curl to download files
RUN apt-get update && apt-get install -y \
    curl

# Download and install ngrok directly
RUN curl -sL https://ngrok.com/download -o /tmp/ngrok.zip && \
    apt-get install -y unzip && \
    unzip /tmp/ngrok.zip -d /tmp && \
    mv /tmp/ngrok /usr/local/bin/ngrok && \
    rm -f /tmp/ngrok.zip

# Copy your application files into the container
COPY . /app
WORKDIR /app

# Expose the port your application runs on
EXPOSE 8080

# Run your application (assumes a Ktor app in the container)
CMD ["java", "-jar", "your-ktor-app.jar"]
