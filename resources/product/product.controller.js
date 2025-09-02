import { CATEGORIES } from "../../Constants/API_DB_Constants.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//-----------------------------------
import fs from "fs";
//-----------------
const productsImagesDir = path.join(__dirname, "../../products_images");
//-----------------
import {
  createNewProduct,
  deleteProd,
  getProductById,
  updateProductImage,
  updateProductName,
  updateProductPrice,
} from "./product.model.js";
//=========================================================

export const addNewProduct = async (req, res, next) => {
  const { cat_name, product_name, price } = req.body;
  // look back in the router for multer options
  const newImageName = req.file ? req.file.filename : null;

  let cat_english_name = Object.keys(CATEGORIES).find(
    (k) => CATEGORIES[k].name == cat_name
  );
  //====================================
  createNewProduct(
    cat_english_name,
    product_name,
    parseFloat(price),
    newImageName
  )
    .then(() => {
      res.json({
        success: true,
        msg: "تم اضافة المنتج",
      });
    })
    .catch((errMsg) => {
      res.json({
        success: false,
        msg: errMsg ? errMsg : "error",
      });
    });
};

export const editProductImg = (req, res, next) => {
  const { cat_name, product_id } = req.body;
  // look back in the router for multer options
  const newImageName = req.file?.filename;

  getProductById(product_id)
    .then((product) => {
      if (product["img_name"] && product["img_name"] != null) {
        // remove old image if exists
        const oldImagePath = path.join(productsImagesDir, product["img_name"]);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateProductImage(product_id, newImageName)
        .then(() => {
          res.json({
            success: true,
            msg: newImageName,
          });
        })
        .catch((errMsg) => {
          res.json({
            success: false,
            msg: errMsg ? errMsg : "error",
          });
        });
    })
    .catch((errMsg) => {
      res.json({
        success: false,
        msg: errMsg ? errMsg : "error",
      });
    });
};

export const editProductName = (req, res, next) => {
  const { cat_name, product_id, new_product_name } = req.body;

  updateProductName(product_id, new_product_name)
    .then(() => {
      res.json({
        success: true,
        msg: "تم تعديل الاسم",
      });
    })
    .catch((errMsg) => {
      res.json({
        success: false,
        msg: errMsg ? errMsg : "error",
      });
    });
};

export const editProductPrice = (req, res, next) => {
  const { cat_name, product_id, new_price } = req.body;

  updateProductPrice(product_id, new_price)
    .then(() => {
      res.json({
        success: true,
        msg: "تم تعديل السعر",
      });
    })
    .catch((errMsg) => {
      res.json({
        success: false,
        msg: errMsg ? errMsg : "error",
      });
    });
};
export const deleteProduct = (req, res, next) => {
  const { cat_name, product_id } = req.body;

  deleteProd(product_id)
    .then(() => {
      res.json({
        success: true,
        msg: "تم حذف المنتج",
      });
    })
    .catch((errMsg) => {
      res.json({
        success: false,
        msg: errMsg ? errMsg : "error",
      });
    });
};
