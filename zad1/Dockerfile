FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
    software-properties-common \
    tzdata \
    curl \
    unzip \
    zip \
    python3-pip

RUN add-apt-repository ppa:deadsnakes/ppa && apt-get update && \
    apt-get install -y python3.10 python3.10-venv python3.10-dev
