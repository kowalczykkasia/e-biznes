package main

import (
    "log"
    "zad4/handlers"
    "zad4/models"

    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

func main() {
    db, err := gorm.Open(sqlite.Open("./products.db"), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to the database:", err)
    }
    db.AutoMigrate(&models.Product{})

    e := echo.New()
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    productHandler := &handlers.ProductHandler{DB: db}

    e.GET("/products", productHandler.GetAll)
    e.POST("/products", productHandler.Create)

    e.PUT("/products/:id", productHandler.Update)

    e.DELETE("/products/:id", productHandler.Delete)

    e.Logger.Fatal(e.Start(":8080"))
}
