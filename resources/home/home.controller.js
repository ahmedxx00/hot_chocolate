import {
  Authority,
  CATEGORIES,
  COOKIE_NAME,
} from "../../Constants/API_DB_Constants.js";
import { getProductsOfCat } from "../product/product.model.js";

//------------------------------------------------------
export const getCatPage = (req, res, next) => {
  let cat_name = req.params.cat_name;

  let is_super_admin =
    req.payload != null && req.payload.authority == Authority.SUPERADMIN;

  let cat_english_name = Object.keys(CATEGORIES).find(
    (k) => CATEGORIES[k].name == cat_name
  );

  getProductsOfCat(cat_english_name)
    .then((results) => {
      res.render("cat_page.ejs", {
        title: cat_name,
        isLoggedIn: is_super_admin, // the same as logged in
        is_super_admin: is_super_admin,
        cat_name: cat_name,
        products_array: results,
      });
    })
    .catch((errMsg) => {
      res.end();
    });
};

//=======================================
// ajx PUT
export const editDisplayCatCover = (req, res, next) => {
  // let id = req.payload.id;
  // let phone = req.payload.phone; // phone
  // let authority = req.payload.authority; // dispatcher
  // let city = req.payload.city; // city
  // no req.payload
  const { cat_name } = req.body;
  // look back in the router for multer options
  const newImageName = req.name_to_be_sent_to_browser;

  res.json({
    success: true,
    msg: newImageName,
  });
};
//=======================================
//==================[ logout ]=====================

// from ajax
export const logOut = (req, res, next) => {
  res.clearCookie(COOKIE_NAME);
  res.json({
    success: true,
    msg: "logout successful",
    redirectUrl: "/",
  });
};
