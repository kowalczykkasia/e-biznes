FROM ubuntu:22.04

ENV TZ="Europe/Warsaw"

RUN apt-get update && \
    apt-get -y install software-properties-common curl unzip zip bash

RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && \
    sdk install java 8.0.362-amzn && \
    sdk install sbt 1.8.2 && \
    sdk install scala 2.13.10"

RUN curl -s https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip -o /tmp/ngrok.zip && \
    unzip /tmp/ngrok.zip -d /usr/local/bin && \
    rm /tmp/ngrok.zip

RUN ngrok update && \
    ngrok authtoken TOKEN

ENV PATH=$PATH:/root/.sdkman/candidates/sbt/current/bin
ENV PATH=$PATH:/root/.sdkman/candidates/java/current/bin
ENV PATH=$PATH:/root/.sdkman/candidates/scala/current/bin

WORKDIR /app

COPY . .

EXPOSE 9000

CMD sbt run && ngrok http 9000
