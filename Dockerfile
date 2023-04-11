FROM openjdk:17-slim

ENV JAR_PATH /StrongAutoApp/target/StrongAutoApp-1.0-SNAPSHOT.jar
ENV PROFILE docker
ENV JAVA_OPTIONS ''
ENV JAVA_PROPERTIES ''

WORKDIR /strong-auto

COPY $JAR_PATH strong-auto-app.jar

EXPOSE 3000

ENTRYPOINT exec java $JAVA_OPTIONS -jar \
              -Dspring.profiles.active="$PROFILE" \
              $JAVA_PROPERTIES strong-auto-app.jar