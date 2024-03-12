const pages = ["about", "view", "home", "not", "create"];
let curPage = 0;

window.addEventListener("load", function () {

    (function () {
        let redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect !== location.href) {
            if (redirect.substring(redirect.length - 1) === "/") {
                redirect = redirect.substring(0, redirect.length - 1);
            }

            let check = redirect.replace("online-ecards.com", "");
            if (pages.indexOf(check) < 0) {
                check = "not";
                redirect = "404"
            }
            history.replaceState(null, "", redirect);
            document.getElementsByClassName(pages[curPage])[0].style.display = "none";
            document.getElementsByClassName(check)[0].style.display = "block";
            curPage = pages.indexOf(check);
        } else {
            $("#main").fadeIn("slow", function () {});
        }
    })();

    window.onpopstate = function () {
        let toPage = location.href;
        let ext = toPage.replace("online-ecards.com", "");
        if (ext === "") {
            ext = "main";
        }
        if (ext === "404") {
            ext = "not";
        }
        loadPage(pages.indexOf(ext));
    };


    function loadPage(x) {
        $("#" + pages[curPage]).fadeOut("slow", function () {
            let $win = $(window);
            document.body.scrollTop = 0; // For Chrome, Safari and Opera
            document.documentElement.scrollTop = 0; // For IE and Firefox
            $("#" + pages[x]).fadeIn("slow", function () {
                curPage = x;
            });
        });
    }

});