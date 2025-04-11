import play.sbt.PlayImport._

enablePlugins(PlayScala)

name := "zad2-play-app"

version := "1.0"

scalaVersion := "2.13.8"

libraryDependencies ++= Seq(
  guice,
  "com.typesafe.play" %% "play" % "2.8.8",
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.14"
)

resolvers += "Typesafe Releases" at "https://repo.typesafe.com/typesafe/releases/"
