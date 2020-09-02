function getPhoto(a) {
    var elem = document.getElementById("entbtn");
    var etex = document.getElementById("usernameInput");
    if (elem.innerHTML == "Start") elem.innerHTML = "Finish";
    else if (elem.innerHTML == "Finish") elem.innerHTML = "New";
    else if (elem.innerHTML == "New") {
        etex.value = "";
        etex.placeholder = "Enter new username"
        elem.innerHTML = "Start";
    }
    // validation for instagram usernames
    var regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
    var validation = regex.test(a);
    if (validation) {
        $.get("https://www.instagram.com/" + a + "/?__a=1")
            .done(function(data) {
                var photoURL = data["graphql"]["user"]["profile_pic_url_hd"];
                drawonCanvas(photoURL);
            })
            .fail(function() {
                // code for 404 error 
                alert('Username was not found!')
            })

    } else {
        alert('The username is invalid!')
    }
}

function drawonCanvas(x) {
    // update img element
    var c = document.getElementById("drawcanvas");
    var ctx = c.getContext("2d");
    var img2 = new Image();
    img2.src = x;
    ctx.drawImage(img2, 50, 50, 400, 400);
    var img1 = document.getElementById("img1");
    ctx.drawImage(img1, 0, 0, 500, 500);
}