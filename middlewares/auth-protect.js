import { verifyTk } from "../helpers/jwt-helper.js";

//------------------------------------------------------------

const authProtect = async (req, res, next) => {
  let sc = req.signedCookies;

  if (sc["tk"]) {
    // there is a cookie with tk

    verifyTk(sc["tk"])
      .then((payload) => {
        // already logged in
        return res.redirect('/'); // back to home - he is already logged in 
      })
      .catch((errNOtVerified) => {
        return next(); // not logged in give him admin-login.ejs page 
      });
  } else {
    // no cookie with token or token is edited manually
    return next(); // not logged in give him admin-login.ejs page
  }
};

export default authProtect;
