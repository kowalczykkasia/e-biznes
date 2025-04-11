FROM openjdk:8-jdk

RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee -a /etc/apt/sources.list.d/sbt.list && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 642AC823 && \
    apt-get update && \
    apt-get install -y sbt

WORKDIR /app

COPY . .

EXPOSE 9000

CMD ["sbt", "run"]
