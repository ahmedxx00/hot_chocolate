import { LoginAdmin } from "../admin/admin.model.js";

import {
  Authority,
  COOKIE_NAME,
  CookieOptions,
} from "../../Constants/API_DB_Constants.js";

//-----------------------------------------------------------------
export const getAdminLoginPage = (req, res, next) => {
  res.render("admin-login.ejs");
};


//---------------------------------------------------------------
// from ajax admin-login.ejs page
export const AdminLogin = (req, res, next) => {
  const { name , password, authority } = req.body;

  if (name && password && authority) {
    LoginAdmin(name, password, authority)
      .then((enc_tk) => {
        res.cookie(COOKIE_NAME, enc_tk, CookieOptions);
        res.json({
          success: true,
          msg: "done",
          redirectUrl: `/`, // home but logged in 
        });
      })
      .catch((errMsg) => {
        res.json({
          success: false,
          msg: errMsg ? errMsg : "error",
        });
      });
  } else {
    res.json({
      success: false,
      msg: "حقول فارغة",
    });
  }
};
