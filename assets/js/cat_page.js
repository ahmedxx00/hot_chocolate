import * as common from "./common.js";
import * as items from "./items.js";

$(document).ready(function () {
  // ==================== add new product ajax POST ======================
  $(document).on("click", ".btn_add_product", function (e) {
    let cat_name = $(this).siblings(".cat_name").html().toString().trim();
    $(".new_product_modal").find(".cat_name").html(cat_name);
    //======= show modal ======
    $(".new_product_modal").modal({
      fadeDuration: 500,
    });
    //========================
  });

  $(document).on("click", "#cnf_new_product_btn", function (e) {
    let _this = $(e.target),
      $new_product_modal = _this.parents(".new_product_modal"),
      cat_name = $new_product_modal.find(".cat_name").html().toString().trim(),
      product_name = $new_product_modal
        .find("input[name = 'product_name']")
        .val()
        .toString()
        .trim()
        .replace(/\s+/g, " "),
      file = $new_product_modal.find("#new_product_image_picker")[0].files[0],
      price = $new_product_modal
        .find("input[name = 'price']")
        .val()
        .toString()
        .trim();

    if (
      cat_name &&
      product_name &&
      file &&
      !isNaN(parseFloat(price)) &&
      parseFloat(price) > 0
    ) {
      const formData = new FormData();
      formData.append("cat_name", cat_name);
      formData.append("product_name", product_name);
      formData.append("price", price);

      if (file) {
        formData.append("image", file);
      }

      let add_new_product = () => {
        $.ajax({
          type: "POST",
          url: "/product/add_new_product",
          data: formData,
          processData: false,
          contentType: false,
          timeout: 10000,
          success: function (response) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------

            if (response.success) {
              common.showSpinnerData(
                "حسناً",
                response.msg,
                "black",
                "green",
                false,
                true,
                false,
                null,
                null
              );
            } else {
              if (response.msg == "error") {
                common.showSpinnerData(
                  "حدث خطأ ما",
                  "نأسف",
                  "black",
                  "red",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              } else {
                common.showSpinnerData(
                  "تحذير",
                  response.msg,
                  "black",
                  "red",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              }
            }
          },
          error: function (xhr, status, error) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            console.log(xhr.responseText);
            common.showSpinnerData(
              "حدث خطأ ما",
              "نأسف",
              "black",
              "red",
              true,
              false,
              false,
              null,
              null
            );
          },
        });
      };

      common.manipulateAjax(add_new_product);
    } else {
      showSweetAlert("هناك حقول فارغة");
    }
  });

  // ==================== edit_product_img ajax PUT ======================
  $(document).on("click", ".product.admin .img_wrap", function (e) {
    let cat_name = $(".head").find(".cat_name").html().toString().trim(),
      product_id = $(this)
        .parents(".product")
        .find("input[name = 'id']")
        .val()
        .toString()
        .trim(),
      product_name = $(this)
        .parents(".product")
        .find(".product_name")
        .html()
        .toString()
        .trim();

    $("#edit_product_img_modal")
      .find("input[name = 'product_id']")
      .val(product_id);
    $("#edit_product_img_modal").find("input[name = 'cat_name']").val(cat_name);
    $("#edit_product_img_modal").find(".product_name").html(product_name);
    //======= show modal ======
    $("#edit_product_img_modal").modal({
      fadeDuration: 500,
    });
    //========================
  });

  $(document).on("click", "#cnf_edit_product_img_btn", function (e) {
    let _this = $(e.target),
      $edit_product_img_modal = _this.parents("#edit_product_img_modal"),
      cat_name = $edit_product_img_modal
        .find("input[name = 'cat_name']")
        .val()
        .toString()
        .trim(),
      product_id = $edit_product_img_modal
        .find("input[name = 'product_id']")
        .val()
        .toString()
        .trim(),
      file = $("#product_image_picker")[0].files[0];
    if (cat_name && product_id && file) {
      //----------------------
      const formData = new FormData();
      formData.append("image", file);
      formData.append("cat_name", cat_name);
      formData.append("product_id", product_id);
      //----------------------

      let edit_product_img = () => {
        $.ajax({
          type: "PUT",
          url: "/product/edit_product_img",
          data: formData,
          processData: false,
          contentType: false,
          timeout: 5000,
          success: function (response) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            if (response.success) {
              let updated_product = $(".product").filter(function () {
                return (
                  $(this).find("input[name = 'id']").val().toString().trim() ===
                  product_id
                );
              });
              $(updated_product)
                .find("img.displayed_img")
                .attr("src", `/${response.msg}`);
              common.showSpinnerData(
                "حسناً",
                "تم تعديل الصورة",
                "black",
                "green",
                true,
                false,
                false,
                null,
                null
              );
            } else {
              if (response.msg == "error") {
                common.showSpinnerData(
                  "حدث خطأ ما",
                  "نأسف",
                  "black",
                  "red",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              } else {
                common.showSpinnerData(
                  "تحذير",
                  response.msg,
                  "black",
                  "blue",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              }
            }
          },
          error: function (xhr, status, error) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            console.log(xhr.responseText);
            common.showSpinnerData(
              "حدث خطأ ما",
              "نأسف",
              "black",
              "red",
              true,
              false,
              false,
              null,
              null
            );
          },
        });
      };

      common.manipulateAjax(edit_product_img);
    } else {
      showSweetAlert("اختر صورة");
    }
  });

  // ==================== edit_product_name ajax PUT ======================
  $(document).on("click", ".product.admin .product_name", function (e) {
    let cat_name = $(".head").find(".cat_name").html().toString().trim(),
      product_id = $(this)
        .parents(".product")
        .find("input[name = 'id']")
        .val()
        .toString()
        .trim(),
      product_name = $(this)
        .parents(".product")
        .find(".product_name")
        .html()
        .toString()
        .trim();

    $("#edit_product_name_modal")
      .find("input[name = 'product_id']")
      .val(product_id);
    $("#edit_product_name_modal")
      .find("input[name = 'cat_name']")
      .val(cat_name);
    $("#edit_product_name_modal").find(".product_name").html(product_name);

    //======= show modal ======
    $("#edit_product_name_modal").modal({
      fadeDuration: 500,
    });
    //========================
  });

  $(document).on("click", "#cnf_edit_product_name_btn", function (e) {
    let _this = $(e.target),
      $edit_product_name_modal = _this.parents("#edit_product_name_modal"),
      cat_name = $edit_product_name_modal
        .find("input[name = 'cat_name']")
        .val()
        .toString()
        .trim(),
      product_id = $edit_product_name_modal
        .find("input[name = 'product_id']")
        .val()
        .toString()
        .trim(),
      new_product_name = $edit_product_name_modal
        .find("input[name = 'new_product_name']")
        .val()
        .toString()
        .trim();

    if (cat_name && product_id && new_product_name) {
      let edit_product_name = () => {
        $.ajax({
          type: "PUT",
          url: "/product/edit_product_name",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            cat_name: cat_name,
            product_id: product_id,
            new_product_name: new_product_name,
          }),
          dataType: "json",
          timeout: 5000,
          success: function (response) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            if (response.success) {
              let updated_product = $(".product").filter(function () {
                return (
                  $(this).find("input[name = 'id']").val().toString().trim() ===
                  product_id
                );
              });
              $(updated_product).find(".product_name").html(new_product_name);
              common.showSpinnerData(
                "حسناً",
                "تم تعديل الاسم",
                "black",
                "green",
                true,
                false,
                false,
                null,
                null
              );
            } else {
              if (response.msg == "error") {
                common.showSpinnerData(
                  "حدث خطأ ما",
                  "نأسف",
                  "black",
                  "red",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              } else {
                common.showSpinnerData(
                  "تحذير",
                  response.msg,
                  "black",
                  "blue",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              }
            }
          },
          error: function (xhr, status, error) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            console.log(xhr.responseText);
            common.showSpinnerData(
              "حدث خطأ ما",
              "نأسف",
              "black",
              "red",
              true,
              false,
              false,
              null,
              null
            );
          },
        });
      };

      common.manipulateAjax(edit_product_name);
    } else {
      showSweetAlert("أدخل الاسم الجديد");
    }
  });
  //==========================================================

  //==========================================================

  // ==================== edit_product_min_prc ajax PUT ======================

  $(document).on("click", ".product.admin .price", function (e) {
    let cat_name = $(".head").find(".cat_name").html().toString().trim(),
      product_id = $(this)
        .parents(".product")
        .find("input[name = 'id']")
        .val()
        .toString()
        .trim(),
      product_name = $(this)
        .parents(".product")
        .find(".product_name")
        .html()
        .toString()
        .trim();

    $("#edit_product_price_modal")
      .find("input[name = 'product_id']")
      .val(product_id);
    $("#edit_product_price_modal")
      .find("input[name = 'cat_name']")
      .val(cat_name);
    $("#edit_product_price_modal").find(".product_name").html(product_name);

    //======= show modal ======
    // $("#edit_product_min_prc_modal").modal({
    //   fadeDuration: 500,
    // });
    $("#edit_product_price_modal").modal({
      fadeDuration: 500,
    });

    //===========[request focus ]=============

    // انتظر شوية بعد ما المودال يظهر
    setTimeout(function () {
      const $input = $("#edit_product_price_modal").find(
        "input[name = 'new_price']"
      );
      $input.trigger("focus");
      // لما تدوس Enter جوه الإنبت، يعمل كليك للزرار
      $input.off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13 || e.which == 13) {
          e.preventDefault();
          $("#cnf_edit_product_price_btn").click();
        }
      });
    }, 500);
    //========================
  });

  $(document).on("click", "#cnf_edit_product_price_btn", function (e) {
    let _this = $(e.target),
      $edit_product_price_modal = _this.parents("#edit_product_price_modal"),
      cat_name = $edit_product_price_modal
        .find("input[name = 'cat_name']")
        .val()
        .toString()
        .trim(),
      product_id = $edit_product_price_modal
        .find("input[name = 'product_id']")
        .val()
        .toString()
        .trim(),
      new_price = $edit_product_price_modal
        .find("input[name = 'new_price']")
        .val()
        .toString()
        .trim();

    if (cat_name && product_id && new_price) {
      let edit_product_price = () => {
        $.ajax({
          type: "PUT",
          url: "/product/edit_product_price",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            cat_name: cat_name,
            product_id: product_id,
            new_price: parseFloat(new_price),
          }),
          dataType: "json",
          timeout: 5000,
          success: function (response) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            if (response.success) {
              let updated_product = $(".product").filter(function () {
                return (
                  $(this).find("input[name = 'id']").val().toString().trim() ===
                  product_id
                );
              });
              $(updated_product).find(".price").find(".prc").html(new_price);

              common.showSpinnerData(
                "حسناً",
                response.msg,
                "black",
                "green",
                true,
                false,
                false,
                null,
                null
              );
            } else {
              if (response.msg == "error") {
                common.showSpinnerData(
                  "حدث خطأ ما",
                  "نأسف",
                  "black",
                  "red",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              } else {
                common.showSpinnerData(
                  "تحذير",
                  response.msg,
                  "black",
                  "blue",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              }
            }
          },
          error: function (xhr, status, error) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            console.log(xhr.responseText);
            common.showSpinnerData(
              "حدث خطأ ما",
              "نأسف",
              "black",
              "red",
              true,
              false,
              false,
              null,
              null
            );
          },
        });
      };

      common.manipulateAjax(edit_product_price);
    } else {
      showSweetAlert("أدخل السعر");
    }
  });

  // ==================== btn_rem_product dialog ======================
  $(document).on("click", ".btn_rem_product", function (e) {
    let cat_name = $(".head").find(".cat_name").html().toString().trim(),
      product_id = $(this)
        .parents(".product")
        .find("input[name = 'id']")
        .val()
        .toString()
        .trim();

    let $to_show = $(/*html*/ `
          <h3 class='cnf_rem_product_h'>هل تريد حذف المنتج ؟</h3>
          <div class='rem_product_btns'>
            <button class='cancel_rem_product_btn'>لا</button>
            <button class='cnf_rem_product_btn'>نعم</button>
          </div>
        `);
    // we send the ajax below in the dialog
    showRemoveproductDialog($to_show, cat_name, product_id);
  });
  //==========================================================
});

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ helpers ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function showSweetAlert(title) {
  Swal.fire({
    title: title,
    // text: '',
    icon: "error",
    confirmButtonText: "OK",
    width: "250px",
    background: "#800000",
    color: "#ffffff",
    iconColor: "#000000",
    timer: 10000,
    allowEscapeKey: true,
    confirmButtonColor: "#000000",
  });
}
function showGreenSweetAlert(title) {
  Swal.fire({
    title: title,
    // text: '',
    icon: "error",
    confirmButtonText: "OK",
    width: "200px",
    background: "#00c200",
    color: "#ffffff",
    iconColor: "#000000",
    timer: 10000,
    allowEscapeKey: true,
    confirmButtonColor: "#000000",
  });
}

function showRemoveproductDialog($dialog_to_show, cat_name, product_id) {
  $("<div class='loader'><div class='spin_wrap'></div></div>")
    .hide()
    .appendTo("body")
    .fadeIn(500, function () {
      $dialog_to_show.hide().appendTo(".spin_wrap").show(500);

      $(".loader").on("click", function (e) {
        if (e.target !== e.currentTarget) return;
        $(".loader").fadeOut(500, function () {
          $(this).remove();
        });
      });

      $(".cancel_rem_product_btn").click(function (e) {
        $(".loader").fadeOut(500, function () {
          $(this).remove();
        });
      });

      $(".cnf_rem_product_btn").click(function (e) {
        $(".loader").fadeOut(500, function () {
          $(this).remove();

          let remove_product = () => {
            $.ajax({
              type: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              url: "/product/remove_product",
              data: JSON.stringify({
                cat_name: cat_name,
                product_id: product_id,
              }),
              dataType: "json",
              timeout: 5000,
              success: function (response) {
                if (response.success) {
                  // -------- remove product card ------------
                  let removed_product = $(".product").filter(function () {
                    return (
                      $(this)
                        .find("input[name = 'id']")
                        .val()
                        .toString()
                        .trim() === product_id
                    );
                  });
                  $(removed_product).slideUp(300, function () {
                    $(this).remove();
                  });
                  //--------------------------------------

                  common.showSpinnerData(
                    "تم",
                    "تم حذف المنتج",
                    "black",
                    "green",
                    true,
                    false,
                    false,
                    null,
                    null
                  );
                } else {
                  if (response.msg == "error") {
                    common.showSpinnerData(
                      "حدث خطأ ما",
                      "نأسف",
                      "black",
                      "red",
                      true,
                      false,
                      false,
                      null,
                      null
                    );
                  } else {
                    common.showSpinnerData(
                      "تحذير",
                      response.msg,
                      "black",
                      "blue",
                      true,
                      false,
                      false,
                      null,
                      null
                    );
                  }
                }
              },
              error: function (xhr, status, error) {
                console.log(xhr.responseText);
                common.showSpinnerData(
                  "حدث خطأ ما",
                  "نأسف",
                  "black",
                  "red",
                  true,
                  false,
                  false,
                  null,
                  null
                );
              },
            });
          };
          common.manipulateAjax(remove_product);
        });
      });
    });
}
