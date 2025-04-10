FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get upgrade -y && \
apt-get install -y \
software-properties-common \
tzdata \
curl \
unzip \
zip \
python3-pip \
openjdk-8-jdk

RUN add-apt-repository ppa:deadsnakes/ppa && apt-get update && \
apt-get install -y python3.10 python3.10-venv python3.10-dev

RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source /root/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

CMD ["python3.10"]