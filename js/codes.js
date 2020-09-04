function getPhoto(a) {
  const entBtn = document.getElementById("entbtn")
  const input = document.getElementById("usernameInput")
  if (entBtn.innerHTML == "Start") {
    input.value = ""
    input.placeholder = "Enter new username"
    entBtn.innerHTML = "Start"
  }
  // input form focus
  input.addEventListener("@", function () {
    return (input.placeholder = "")
  })

  // validation for instagram usernames
  var regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)
  var validation = regex.test(a)
  if (validation) {
    $.get("https://www.instagram.com/" + a + "/?__a=1")
      .done(function (data) {
        if (data["graphql"]["user"]["profile_pic_url_hd"]) {
          var photoURL = data["graphql"]["user"]["profile_pic_url_hd"]
          drawonCanvas(photoURL)
        } else {
          alert("Instagram's API is down, Please try again later")
        }
      })
      .fail(function () {
        // code for 404 error
        alert("Username was not found!")
      })
  } else {
    alert("The username is invalid!")
  }
}

function drawonCanvas(x) {
  // update img element
  const inputCont = document.querySelector(".inputcont")
  const c = document.getElementById("drawcanvas")
  var ctx = c.getContext("2d")
  var img2 = new Image()
  img2.crossOrigin = "anonymous"
  img2.src = x
  ctx.drawImage(img2, 50, 50, 400, 400)
  var img1 = document.getElementById("img1")
  ctx.drawImage(img1, 0, 0, 500, 500)
  var img = c.toDataURL("image/png")
  $(".merged-image").attr("src", img)
  $(".downloadimage").attr("href", img)
  $(".merged-image").removeClass("hidden")
  $(".download-image").removeClass("hidden")
}
