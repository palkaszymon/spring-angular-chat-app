FROM registry.access.redhat.com/ubi8/openjdk-21:latest as build-env

WORKDIR /build-workspace

ARG version=0.0.0-SNAPSHOT

USER root
COPY . .
RUN chmod +x ./gradlew && \
    ./gradlew -Pversion=$version --build-file=./build.gradle bootJar

# Run app stage
FROM amazoncorretto:21.0.2-alpine3.19

RUN adduser -u 10001 -h /app -D appuser && \
    chmod u=rwx,g=r,o= /app

WORKDIR /app
COPY --from=build-env --chown=10001:10001 /build-workspace/build/libs/*.jar /app/app.jar

EXPOSE 8080
USER 10001

ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "app.jar"]