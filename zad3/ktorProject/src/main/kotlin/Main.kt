import dev.kord.core.Kord
import dev.kord.core.entity.Message
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.*
import kotlinx.serialization.json.*
import java.util.*

const val botToken = "MTM2MDUyMzQ1MjgzODMxNDExNA.GXzWix.k7BMpmBex-qs_d5kvPs184wydO4Hzf7ZW1bkf0"
const val channelId = "1360527507891290192"

suspend fun sendMessage(content: String) {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) { json() }
    }

    val response = client.post("https://discord.com/api/v10/channels/$channelId/messages") {
        headers {
            append(HttpHeaders.Authorization, "Bot $botToken")
            append(HttpHeaders.ContentType, "application/json")
        }
        setBody(Json.encodeToJsonElement(mapOf("content" to content)))
    }

    println("Message sent. Status: ${response.status}")
    client.close()
}

suspend fun runBot() {
    val bot = Kord(botToken)

    bot.on<MessageCreateEvent> {
        if (message.author?.isBot == false) {
            val foundCategory = CATEGORIES.find { message.content.contains(it, ignoreCase = true) }
            when {
                message.content.contains(CATEGORIES_KEY) -> {
                    getCategories(message)
                }

                foundCategory != null -> {
                    getProducts(message, foundCategory)
                }

                else -> {
                    respond(message, "Thank you for messaging me!")
                }
            }

        }
    }

    bot.login {
        presence { playing("Some cool music") }
    }
}

private suspend fun getCategories(message: Message) {
    val response = CATEGORIES.joinToString(separator = "\n") { "- $it" }
    respond(message, "Available categories:\n$response")
}

private suspend fun getProducts(message: Message, category: String) {
    val productList =
        PRODUCTS[category.replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() }]
    if (productList != null) {
        val response = productList.joinToString(separator = "\n") { "- $it" }
        respond(message, "Available products:\n$response")
    } else {
        respond(message, "There is no products available!")
    }
}

private suspend fun respond(message: Message, response: String) {
    if (message.getChannelOrNull()?.data?.type?.value == 1) {
        val dmChannel = message.author?.getDmChannel()
        dmChannel?.createMessage(response)
    } else {
        sendMessage(response)
    }
}

fun main() = runBlocking {
    runBot()
}

