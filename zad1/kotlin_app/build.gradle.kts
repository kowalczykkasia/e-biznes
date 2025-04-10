plugins {
    kotlin("jvm") version "1.8.10"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    implementation("org.xerial:sqlite-jdbc:3.41.2.2")
}

tasks {
    register<JavaExec>("run") {
        mainClass.set("MainKt")
        classpath = sourceSets["main"].runtimeClasspath
    }
}
