import * as common from "./common.js";

$(function () {
  //===================================================================================
  // all sanf pick and cart logic is in the cart.js file
  // and all cart and popups css are in cart.css file
  //===================================================================================

  $(".logout").click(function (e) {
    e.preventDefault();
    let $to_show = $(`
      <h3 class='cnf_logout_h'>هل تريد تسجيل الخروج ؟</h3>
      <div class='lgt_btns'>
      <button class='cancel_logout_btn'>لا</button>
        <button class='cnf_logout_btn'>مغادرة</button>
      </div>
    `);
    common.showCustomLogoutDialog($to_show);
  });

});

//===================================================

function roundUpToHalf(value) {
  return Math.ceil(value * 2) / 2;
}
