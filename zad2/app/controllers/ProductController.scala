package controllers

import play.api.mvc._
import javax.inject._
import scala.collection.mutable.ListBuffer
import play.api.libs.json._
import models.{Product}

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val products = ListBuffer(
    Product(1, "Book", 12.00, 1),
    Product(2, "Water", 8.00, 2),
    Product(3, "Chocolate", 10.00, 2)
  )

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(products))
  }

  def getById(id: Int): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None          => NotFound(Json.obj("message" -> "Product not found"))
    }
  }

  def create: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].map {
      case product =>
        products += product
        Created(Json.toJson(product))
    }.getOrElse(BadRequest("Invalid JSON"))
  }

  def update(id: Int): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].map {
      case product =>
        products.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("message" -> "Product not found"))
          case idx =>
            products(idx) = product
            Ok(Json.toJson(product))
        }
    }.getOrElse(BadRequest("Invalid JSON"))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    products.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("message" -> "Product not found"))
      case idx =>
        products.remove(idx)
        NoContent
    }
  }
}
