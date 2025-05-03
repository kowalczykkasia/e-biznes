package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"zad4/handlers"
	"zad4/models"
	"log"

	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

func main() {
	db, err := gorm.Open(sqlite.Open("./products.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database")
	}

	db.AutoMigrate(&models.Product{})

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	productHandler := &handlers.ProductHandler{DB: db}

	e.GET("/products", productHandler.GetAll)
	e.POST("/products", productHandler.Create)

	e.Logger.Fatal(e.Start(":8080"))
}
