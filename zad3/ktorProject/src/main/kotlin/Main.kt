import dev.kord.core.Kord
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

    println("Wysłano wiadomość. Status: ${response.status}")
    client.close()
}

suspend fun runBot() {
    val bot = Kord(botToken)

    bot.on<MessageCreateEvent> {
        if (message.author?.isBot == false) {
            if (message.getChannelOrNull()?.data?.type?.value == 1) {
                val dmChannel = message.author?.getDmChannel()
                dmChannel?.createMessage("Thanks for your private message!")
            } else {
                sendMessage("Thanks for message on this channel!")
            }
        }
    }

    bot.login {
        presence { playing("Some cool music") }
    }
}

fun main() = runBlocking {
    runBot()
}

