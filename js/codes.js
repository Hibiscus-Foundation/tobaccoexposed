$(document).ready(function() {
    $('.inputAnimate').each(function() {

        var self = $(this);
        var input = self.children('input');
        var span = $('<span />').prependTo(self);
        var div = $('<div />').appendTo(self);
        var em = $('<em />').appendTo(self);

        input.keypress(function(e) {
            if (e.which && e.charCode) {
                resizeForText(self, span, $(this).val() + String.fromCharCode(e.keyCode | e.charCode));
            }
        });

        input.keyup(function(e) {
            if (e.keyCode === 8 || e.keyCode === 46) {
                resizeForText(self, span, $(this).val());
            }
        });
        resizeForText(self, span, input.val());
    });
});

function resizeForText(self, span, text) {
    text = (!text) ? ' ' : text;
    span.text(text);
    self.css('--offsetLeft', span.width() + 3);
    self.css('--offsetLeftScale', span.width() + 19);
}

function getPhoto(a) {
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
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img2 = new Image();
    img2.src = x;
    ctx.drawImage(img2, 50, 50, 400, 400);
    var img1 = document.getElementById("img1");
    ctx.drawImage(img1, 0, 0, 500, 500);
}