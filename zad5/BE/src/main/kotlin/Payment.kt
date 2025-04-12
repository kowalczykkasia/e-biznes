import kotlinx.serialization.Serializable

@Serializable
data class Payment(
    val amount: Double,
    val currency: String,
    val method: String
)
