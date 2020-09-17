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
            .done(function (data) {
                if (data["graphql"]["user"]["profile_pic_url_hd"]) {
                    var photoURL = data["graphql"]["user"]["profile_pic_url_hd"];
                    loadImage(photoURL);
                } else {
                    alert("Instagram's API is down, Please try again later")
                }
            })
            .fail(function () {
                // code for 404 error 
                alert('Username was not found!')
            })

    } else {
        alert('The username is invalid!')
    }
}

function loadImage(x) {
    // update img element
    $('.finalimage').removeClass('hidden');
    $('.merged-image').attr('src', x);

}