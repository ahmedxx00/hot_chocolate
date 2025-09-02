import { Router } from "express";
const router = Router();
import multer from "multer";

import homeProtect from "../../middlewares/home-protect.js";
import {
  Authority,
  CATEGORIES,
} from "../../Constants/API_DB_Constants.js";
import * as homeController from "./home.controller.js";

//--------------
import path from "path";
import fs_promise from "fs/promises";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//--------------
const coversDir = path.join(__dirname, "../../category_covers");
//--------------

router.get("/", homeProtect, (req, res, next) => {

  // ----- if logged in or not ------
  let isLoggedIn = req.payload &&
    req.payload != null &&
    Object.values(Authority).includes(req.payload?.authority);
  //---------------------------

    let cats_covers_obj = {};
    const CAT_NAMES = Object.values(CATEGORIES).map((v) => v.name);

    fs_promise
      .readdir(coversDir)
      .then((files) => {
        Object.keys(CATEGORIES).forEach((key) => {
          const match = files.find(
            (file) => path.parse(file).name.toLowerCase() === key.toLowerCase()
          );
          const imagePath = match ? match : null;
          cats_covers_obj[CATEGORIES[key].name] = imagePath;
        });
        res.render("home.ejs", {
          isLoggedIn : isLoggedIn,
          cats_covers_obj: cats_covers_obj,
        });
      })
      .catch((err) => {
        CAT_NAMES.forEach((cat_name) => {
          cats_covers_obj[cat_name] = null;
        });
        res.render("home.ejs", {
          isLoggedIn: isLoggedIn,
          cats_covers_obj: cats_covers_obj,
        });
      });
    // res.render("home.ejs", { global_phone: global_phone });
  
});

// router.get("/cats/:cat_name", homeProtect, homeController.getProductsPage);


//--------- multer options -----------------

const memoryParser = multer({ storage: multer.memoryStorage() }).single(
  "cover"
);
router.put(
  "/home/edit_display_cat_cover",
  memoryParser /* MUST */,
  replaceOldCatImageFirst /* MUST */,
  homeController.editDisplayCatCover
);

router.get("/cats/:cat_name", homeProtect, homeController.getCatPage);

// from ajax
router.get("/logout", homeController.logOut);

//--------------------------------------
function replaceOldCatImageFirst(req, res, next) {
  const { cat_name } = req.body;
  const file = req.file; /* only one file image not array so not req.files */

  if (!cat_name || !file) {
    return res.json({
      success: false,
      msg: "error",
    });
  }

  let cat_english_key = Object.keys(CATEGORIES).find(
    (key) => CATEGORIES[key].name === cat_name
  );

  fs_promise
    .readdir(coversDir)
    .then((old_files) => {
      const existing = old_files.find(
        (old_file) =>
          path.parse(old_file).name.toLowerCase() ===
          cat_english_key.toLowerCase()
      );
      if (existing) {
        // if old exists will remove it first else will proceed to save the new one
        return fs_promise.unlink(path.join(coversDir, existing));
      } /* no need for else clause */
    })
    .then(() => {
      const ext = path.extname(file.originalname);
      const finalPath = path.join(
        coversDir,
        `${cat_english_key.toLowerCase()}${ext}`
      );

      fs_promise
        .writeFile(finalPath, file.buffer)
        .then(() => {
          req.name_to_be_sent_to_browser = `${cat_english_key.toLowerCase()}${ext}`;
          next();
        })
        .catch((err) => {
          console.log("err1 : " + err);
          res.status(500).json({
            success: false,
            msg: "error",
          });
        });
    })
    .catch((err) => {
      console.log("err2 : " + err);
      res.status(500).json({
        success: false,
        msg: "error",
      });
    });
}
//--------------------------------------

export default router;