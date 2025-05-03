package handlers

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"zad4/models"
)

type ProductHandler struct {
	DB *gorm.DB
}

func (h *ProductHandler) GetAll(c echo.Context) error {
	var products []models.Product
	if err := h.DB.Find(&products).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, products)
}

func (h *ProductHandler) Create(c echo.Context) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.DB.Create(&product).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, product)
}
