import * as common from './common.js';

$(function () {
  //------------- edit_cat_img ---------
  $(".edit_cat_img").click(function (e) {
    e.preventDefault();

    let cat_name = $(this)
      .parents(".cat_card")
      .find(".cat")
      .html()
      .toString()
      .trim();
    $("#edit_cat_cover_modal").find("input[name = 'cat_name']").val(cat_name);
    //======= show modal ======
    $("#edit_cat_cover_modal").modal({
      fadeDuration: 500,
    });
    //========================
  });

  $(document).on("click", "#cnf_edit_cat_cover_btn", function (e) {
    let _this = $(e.target),
      $edit_cat_cover_modal = _this.parents("#edit_cat_cover_modal"),
      cat_name = $edit_cat_cover_modal
        .find("input[name = 'cat_name']")
        .val()
        .toString()
        .trim(),
      file = $("#cat_cover_image_picker")[0].files[0];
    if (cat_name && file) {
      //----------------------
      const formData = new FormData();
      formData.append("cover", file);
      formData.append("cat_name", cat_name);
      //----------------------

      let edit_display_cat_cover = () => {
        $.ajax({
          type: "PUT",
          url: "/home/edit_display_cat_cover",
          data: formData,
          processData: false,
          contentType: false,
          timeout: 5000,
          success: function (response) {
            //-------------- close jquery-modal -------------------
            $.modal.close();
            //------------------------------------------------------
            if (response.success) {
              //-----------------------
              let updated_cat = $(".cat_card").filter(function () {
                return (
                  $(this).find(".cat").html().toString().trim() === cat_name
                );
              });
              $(updated_cat)
                .find("img.cat_cover")
                .attr("src", `/${response.msg}`);

              //-----------------------
              common.showSpinnerData(
                "حسناً",
                "تم تعديل غلاف القسم",
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

      common.manipulateAjax(edit_display_cat_cover);
    } else {
      showSweetAlert("اختر صورة غلاف للقسم");
    }
  });
});
//---------------------------


//------------------------------
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