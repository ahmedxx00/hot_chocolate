import { Router } from "express";
const router = Router();

//-----------------
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//-----------------

import * as productController from "./product.controller.js";
//-----------------

//--------- multer options -----------------
const productsImagesStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../products_images"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // امتداد الصورة
    const timestamp = Date.now(); // عدد الميلي ثانية
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const fileName = `product-${timestamp}-${date}${ext}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: productsImagesStorage });
//--------------------------------

router.post(
  "/add_new_product",
  upload.single("image"),
  productController.addNewProduct
);
//--------------------------------
router.put(
  "/edit_product_img",
  upload.single("image"),
  productController.editProductImg
);
//--------------------------------

router.put("/edit_product_name", productController.editProductName);
router.put("/edit_product_price", productController.editProductPrice);

//--------------------------------
router.delete("/remove_product", productController.deleteProduct);
//==============================================================

export default router;
