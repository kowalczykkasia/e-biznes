package controllers

import play.api.mvc._
import javax.inject._
import scala.collection.mutable.ListBuffer
import play.api.libs.json._
import models.{CartItem, Product}

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val cart = ListBuffer[CartItem]()

  def getCart: Action[AnyContent] = Action {
    Ok(Json.toJson(cart))
  }

  def addToCart: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem].map { cartItem =>
      cart += cartItem
      Created(Json.toJson(cartItem))
    }.getOrElse(BadRequest("Invalid JSON"))
  }

  def removeFromCart(productId: Int): Action[AnyContent] = Action {
    cart.indexWhere(_.productId == productId) match {
      case -1 => NotFound(Json.obj("message" -> "Product not found in cart"))
      case idx =>
        cart.remove(idx)
        NoContent
    }
  }

  def clearCart: Action[AnyContent] = Action {
    cart.clear()
    NoContent
  }
}
