package handlers

import (
    "net/http"
    "strconv"

    "github.com/labstack/echo/v4"
    "gorm.io/gorm"
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

func (h *ProductHandler) Update(c echo.Context) error {
    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64)
    if err != nil {
        return c.JSON(http.StatusBadRequest, "invalid product ID")
    }

    updated := new(models.Product)
    if err := c.Bind(updated); err != nil {
        return c.JSON(http.StatusBadRequest, err.Error())
    }

    var product models.Product
    if err := h.DB.First(&product, id).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return c.JSON(http.StatusNotFound, "product not found")
        }
        return c.JSON(http.StatusInternalServerError, err.Error())
    }

    if err := h.DB.Model(&product).Updates(updated).Error; err != nil {
        return c.JSON(http.StatusInternalServerError, err.Error())
    }
    return c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) Delete(c echo.Context) error {
    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64)
    if err != nil {
        return c.JSON(http.StatusBadRequest, "invalid product ID")
    }

    if err := h.DB.Delete(&models.Product{}, id).Error; err != nil {
        return c.JSON(http.StatusInternalServerError, err.Error())
    }
    return c.NoContent(http.StatusNoContent)
}
