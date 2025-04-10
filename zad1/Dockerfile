FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
    software-properties-common \
    tzdata \
    curl \
    unzip \
    zip \
    build-essential \
    libssl-dev \
    libreadline-dev \
    zlib1g-dev \
    libbz2-dev \
    libsqlite3-dev \
    python3-pip \
    openjdk-8-jdk

RUN add-apt-repository ppa:deadsnakes/ppa && apt-get update && \
    apt-get install -y python3.10 python3.10-venv python3.10-dev

RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source /root/.sdkman/bin/sdkman-init.sh && sdk install kotlin && sdk install gradle"

ENV PATH=$PATH:/root/.sdkman/candidates/gradle/current/bin

WORKDIR /kotlin_app

COPY kotlin_app /kotlin_app

RUN mkdir -p /kotlin_app/libs && \
    curl -o /kotlin_app/libs/sqlite-jdbc.jar https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.41.2.1/sqlite-jdbc-3.41.2.1.jar

CMD ["gradle", "run"]
