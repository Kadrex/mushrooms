FROM maven:3.6.3-openjdk-17-slim AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /usr/src/app/target/mushrooms-app-0.0.1-SNAPSHOT.jar /usr/app/mushrooms-app-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java","-jar","/usr/app/mushrooms-app-0.0.1-SNAPSHOT.jar"]
