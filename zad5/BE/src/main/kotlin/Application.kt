import io.ktor.http.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.cors.routing.*
import kotlinx.serialization.json.Json

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module()
    }.start(wait = true)
}

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }

    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowHeader(HttpHeaders.ContentType)
    }

    routing {
        get("/api/products") {
            call.respond(
                listOf(
                    Product(1, "Produkt A"),
                    Product(2, "Produkt B")
                )
            )
        }

        post("/api/payments") {
            try {
                val payment = call.receive<Payment>()
                println("Otrzymano płatność: $payment")
                call.respond(mapOf("status" to "ok"))
            } catch (e: Exception) {
                println("Error processing payment: ${e.message}")
                call.respond(HttpStatusCode.BadRequest, mapOf("status" to "error", "message" to e.message))
            }
        }

    }
}
