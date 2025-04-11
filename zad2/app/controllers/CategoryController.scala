package controllers

import play.api.mvc._
import javax.inject._
import scala.collection.mutable.ListBuffer
import play.api.libs.json._
import models.Category

@Singleton
class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val categories = ListBuffer(
    Category(1, "Books"),
    Category(2, "Drinks"),
    Category(3, "Snacks")
  )

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(categories))
  }

  def getById(id: Int): Action[AnyContent] = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None           => NotFound(Json.obj("message" -> "Category not found"))
    }
  }

  def create: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Category].map { category =>
      categories += category
      Created(Json.toJson(category))
    }.getOrElse(BadRequest("Invalid JSON"))
  }

  def update(id: Int): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Category].map { category =>
      categories.indexWhere(_.id == id) match {
        case -1 => NotFound(Json.obj("message" -> "Category not found"))
        case idx =>
          categories(idx) = category
          Ok(Json.toJson(category))
      }
    }.getOrElse(BadRequest("Invalid JSON"))
  }

  def delete(id: Int): Action[AnyContent] = Action {
    categories.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("message" -> "Category not found"))
      case idx =>
        categories.remove(idx)
        NoContent
    }
  }
}
