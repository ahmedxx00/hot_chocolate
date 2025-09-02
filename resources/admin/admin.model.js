import mongoose from "mongoose";

import {
  Authority,
  decrypt,
  encrypt,
  ERRORS,
} from "../../Constants/API_DB_Constants.js";
import { getTk } from "../../helpers/jwt-helper.js";

//------------------------------------------
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  name: {
    type: String,
    index: true,
  },

  password: String,

  authority: {
    type: String,
    index: true,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});
//------------------------------------------
export const Admin = mongoose.model("admin", adminSchema);
//------------------------------------------

// ============================ CreateAdmin ====================================

export const LoginAdmin = (name, password, authority) => {
  return new Promise((resolve, reject) => {
    if (Object.values(Authority).includes(authority)) {
      Admin.findOne({ name : name , authority: authority })
        .then(async (admin) => {
          if (admin && !admin.blocked) {
            let enc = await encrypt(password);
            if (enc == admin.password) {
              try {
                let enc_tk = await getTk(
                  admin._id,
                  name,
                  authority,
                );
                resolve(enc_tk);
              } catch (err1) {
                console.log("err1 : " + err1);
                reject();
              }
            } else {
              reject(ERRORS.password_error);
            }
          } else {
            reject(ERRORS.admin_not_found);
          }
        })
        .catch((err2) => {
          console.log("err2 : " + err2);
          reject();
        });
    } else {
      reject(ERRORS.admin_not_found);
    }
  });
};