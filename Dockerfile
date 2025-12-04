# Use official Maven image to build the project
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy entire project
COPY . .

# Build the Spring Boot JAR
RUN mvn -B -DskipTests package


# ----------- RUNTIME IMAGE -----------
FROM eclipse-temurin:17

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java","-jar","app.jar"]
