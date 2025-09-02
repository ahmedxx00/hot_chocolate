import mongoose from "mongoose";

//------------------------------------------
const Schema = mongoose.Schema;
const productSchema = new Schema({
  cat_name: String,
  product_name: String,
  img_name: String,
  price: { type: mongoose.Types.Double, default: 0 },
});

//------------------------------------------
export const Product = mongoose.model("product", productSchema);
//------------------- used -----------------------

export const getProductsOfCat = (cat_english_name) => {
  return new Promise((resolve, reject) => {
    Product.find({ cat_name: cat_english_name })
      .lean()
      .then((results) => {
        // paginate
        resolve(results);
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};

//--------------------------
export const createNewProduct = (
  cat_english_name,
  product_name,
  price,
  new_image_name
) => {
  return new Promise((resolve, reject) => {
    let new_product = new Product({
      cat_name: cat_english_name,
      product_name: product_name,
      price: parseFloat(price),
      img_name: new_image_name,
    });

    new_product
      .save()
      .then(() => {
        resolve();
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};
//-----------
export const getProductById = (product_id) => {
  return new Promise((resolve, reject) => {
    Product.findById(product_id)
      .then((product) => {
        resolve(product);
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};
//-----------

export const updateProductImage = (product_id, new_image_name) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(product_id, {
      $set: { img_name: new_image_name },
    })
      .then(() => {
        resolve();
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};

export const updateProductName = (product_id, new_product_name) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(product_id, {
      $set: { product_name: new_product_name },
    })
      .then(() => {
        resolve();
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};
export const updateProductPrice = (product_id, new_price) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(product_id, {
      $set: { price: parseFloat(new_price) },
    })
      .then(() => {
        resolve();
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};
export const deleteProd = (product_id) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndDelete(product_id)
      .then(() => {
        resolve();
      })
      .catch((err1) => {
        console.log("err1 : " + err1);
        reject();
      });
  });
};
