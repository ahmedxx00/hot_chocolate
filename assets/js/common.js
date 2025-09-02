/*######### Global Variables ############*/

export const REDIRECT_TYPE = {
  href: "href",
  replace: "replace",
};

/*======================  Spinner modal  =========================*/

export function manipulateAjax(ajaxFunction) {
  $(
    `<div class='loader'><div class='spin_wrap'><div class='spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div></div>`
  )
    .hide()
    .appendTo("body")
    .fadeIn(300, function () {
      setTimeout(() => {
        ajaxFunction();
      }, 600);
    });
}

export function showCustomLogoutDialog($dialog_to_show) {
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

      $(".cancel_logout_btn").click(function (e) {
        $(".loader").fadeOut(500, function () {
          $(this).remove();
        });
      });

      $(".cnf_logout_btn").click(function (e) {
        $(".loader").fadeOut(500, function () {
          $.ajax({
            type: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            dataType: "json",
            url: "/logout",
            data: {},
            timeout: 5000,
            success: function (response) {
              $(this).remove();
              if (response.success) {
                window.location.replace(response.redirectUrl);
              }
            },
            error: function (xhr, status, error) {
              $(this).remove();
            },
          });
        });
      });
    });
}

export function showSpinnerData(
  h2_text,
  p_text,
  h2_color,
  p_color,
  isClosable,
  willReload,
  willRedirect,
  redirectUrl,
  redirectType
) {
  $(".spinner").children().css("animation-play-state", "paused"); // pause spinner animation
  $(".spinner").animate({ height: 0 }, 500, function () {
    $(this).remove(); // remove the orange rects spinner only
    let icon = $(`<img src="/site_logo.png" alt="Hot Chocolate"/>`);
    let h2 = $(`<h2 class = 'spinner_h2'>${h2_text}</h2>`);
    let p = $(`<p class = 'spinner_p'>${p_text}</p>`);
    h2.css({ color: h2_color });
    p.css({ color: p_color });
    icon.hide().appendTo(".spin_wrap").show(500);
    h2.hide().appendTo(".spin_wrap").show(500);
    p.hide().appendTo(".spin_wrap").show(500);
  });

  if (isClosable) {
    $(".loader").on("click", function (e) {
      if (e.target !== e.currentTarget) return;
      $(".loader").fadeOut(500, function () {
        $(this).remove();
      });
    });
  } else {
    setTimeout(function () {
      $(".loader").fadeOut(500, function () {
        $(this).remove();
      });
      setTimeout(function () {
        if (willReload) {
          window.location.reload();
        } else if (willRedirect) {
          switch (redirectType) {
            case REDIRECT_TYPE.href:
              window.location.href = redirectUrl;
              break;
            case REDIRECT_TYPE.replace:
              window.location.replace(redirectUrl);
              break;
          }
        } else {
          return; // do nothing
        }
      }, 500);
    }, 3000);
  }
}

export function isEmptyObject(obj) {
  for (var x in obj) {
    return false;
  }
  return true;
}

/*===========================================*/
