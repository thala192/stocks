# Build stage with Eclipse Temurin 21 JDK
FROM eclipse-temurin:21-jdk-jammy AS build

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build application
COPY src ./src
RUN mvn clean package -DskipTests -B

# Runtime stage
FROM eclipse-temurin:21-jre-jammy

# Create a system group and user
RUN groupadd -r javauser && useradd --no-log-init -r -g javauser javauser

WORKDIR /app

# Copy the built artifact from build stage
COPY --from=build /build/target/*.jar app.jar

# Set proper ownership
RUN chown -R javauser:javauser /app

USER javauser

EXPOSE 8080

# Use exec form of CMD with proper JVM options
CMD ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "app.jar"]