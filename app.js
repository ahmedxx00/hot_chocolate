// import http from "http";
import express from "express";
import mongoose from "mongoose";

// express-query-parser -> must be used because express comes with body-parser included and this for POST req.body
// but not come with query-parser for GET req.query
import { queryParser } from "express-query-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import {
  COOKIE_SIGNING_SECRET,
  DB_URI,
  encrypt,
  PORT,
} from "./Constants/API_DB_Constants.js";

import nocache from "nocache";

import fs from "fs";

//-------------------------------------
// import momentTimeZone from "moment-timezone";
//-------------------------------------

const app = express();

//------------------------------
//----------- serve statics --------
//[important for serve static __dirname in ES Module]
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//################ BEGIN [ minifying and obfuscating js static files ] ################

//--------------------------------------
app.use(
  queryParser({
    parseBoolean: true,
    parseNull: true,
    parseUndefined: true,
  })
);
//-------------------------------
app.use(nocache()); // prevent cache is very important
// Use cookie-parser middleware
app.use(cookieParser(COOKIE_SIGNING_SECRET));

//----------- data type options ------------
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

//---------------------------------------------
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "products_images")));
app.use(express.static(path.join(__dirname, "category_covers")));
//---------------- set view engine ------------------
app.set("view engine", "ejs");
app.set("views", "views"); // default folder name is 'views'
//---------------------------------------------------

/*########################[ Routes ]############################*/

import homeRouter from "./resources/home/home.router.js";
import authRouter from "./resources/auth/auth.router.js";
import productRouter from "./resources/product/product.router.js";
// import handlerRouter from "./resources/handler/handler.router.js";
// import dispatcherRouter from "./resources/dispatcher/dispatcher.router.js";
// import preparerRouter from "./resources/preparer/preparer.router.js";
// import deliveryRouter from "./resources/delivery/delivery.router.js";
// import collectorRouter from "./resources/collector/collector.router.js";
// import citySorterRouter from "./resources/city_sorter/city_sorter.router.js";
// import superadminRouter from "./resources/superadmin/superadmin.router.js";
// import cartRouter from "./resources/cart/cart.router.js";

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
// app.use("/handler", handlerRouter);
// app.use("/dispatcher", dispatcherRouter);
// app.use("/preparer", preparerRouter);
// app.use("/delivery", deliveryRouter);
// app.use("/collector", collectorRouter);
// app.use("/city_sorter", citySorterRouter);
// app.use("/superadmin", superadminRouter);
// app.use("/cart", cartRouter);

/*#############################################################*/

//====================== 404 not found =======================
app.use((req, res) => {
  // res.send("404 not found"); // if req for not found router
  res.render("404_not_found.ejs"); // if req for not found router
});
//============================ connect DB && start server ===================
mongoose
  .connect(DB_URI, {
    maxPoolSize: 100,
    minPoolSize: 5,
    maxIdleTimeMS: 10000,
    socketTimeoutMS: 30000,
  })
  .then(async () => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log("error is " + err);
        return;
      }
      console.log(`Restful is listen on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERR Connecting DB" + err);
  });
//============================================================

// console.log(encrypt("fayyadh1973"))
// "1caeb8d51aadf51b38b3aa9e2137b7cb";