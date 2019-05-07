let rmh_affectUser = true;

// To disable the tooltip for first-time users, run "rmh_firstTimeTooltip = false;" on your page, before the body loads (in the head tag).
let rmh_firstTimeTooltip = true;

// To change where the "home" button redirects, change this variable before the page is loaded (before the "body" tag, in the head tag). (not sure if this works yet)
let rmh_href = "../../hub/index.php";

let isRmhOpen;


// RUNNING CODE WHEN THE PAGE HAS LOADED
window.addEventListener("load", function () {


    // APPENDING THE ICON-FONT TO HEAD
    let link = document.createElement("link");
    link.integrity = "sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf";
    link.href = "https://use.fontawesome.com/releases/v5.8.1/css/all.css";
    link.crossOrigin = "anonymous";
    link.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(link);


    // GENERATING THE HANDLE ELEMENT
    let rmh = document.createElement("div");
    rmh.id = "rmh";
    rmh.classList.add("container");
    rmh.innerHTML = '' +
        '        <img id="rmh_handle" src="https://i.imgur.com/KIEjXV8.png" alt="universal menu handle" onmousedown="if(event.preventDefault)event.preventDefault()" onmouseenter="this.style.filter=\'brightness(125%)\'" onmouseleave="this.style.filter=\'brightness(100%)\'">\n' +
        '\n' +
        '        <div id="rmh_bar">\n' +
        '\n' +
        '            <div class="pointer rmh_item">\n' +
        '                <i class="fas fa-home" onclick="if(rmh_affectUser){ saveUser(user); updateSQL(); }; setTimeout(function(){window.location.href=\' ' + rmh_href + ' \'}, 200)"></i>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="rmh_item" id="rmh_tokenCountItem">\n' +
        '                <div class="container row">\n' +
        '                    <img src="https://i.imgur.com/KIEjXV8.png" alt="token" class="rmh_token">\n' +
        '                    <p id="rmh_tokenCount"> x wait a sec</p>\n' +
        '                    <script> setTimeout(function(){document.getElementById("rmh_tokenCount").innerHTML = "x " + getUser().tokenManager.getCount();}, 500);</script>\n' +
        '                </div>\n' +
        '                <button class="retroButton" onclick="window.location.href = \'/games/snake/\'">get more</button>\n' +
        '            </div>\n' +
        '        </div>\n';

    document.body.appendChild(rmh);

    setTimeout(function() {
        rmh_update();
    }, 2000);



    /*

    structure:

    <div id="rmh" class="container">

        <img id="rmh_handle" src="../../resources/redChip.png">

        <div id="rmh_bar">

            <div class="pointer rmh_item">
                <i class="material-icons" onclick="window.location.href='../../hub/index.php'">home</i>
            </div>

            <div class="rmh_item" id="rmh_tokenCountItem">
                <div class="container row">
                    <img src="../../resources/redChip.png" alt="token" class="rmh_token">
                    <p id="rmh_tokenCount"> x 400</p>
                    <script> document.getElementById("tokenCount").innerHTML = "x " + getUser().tokenManager.getCount(); </script>
                </div>
                <button class="retroButton" onclick="">get more</button>
            </div>
        </div>
    </div>
     */



    // DISPLAYS A TOOLTIP IF IT'S THE FIRST TIME THE USER IS LOGGED IN
    if (rmh_affectUser) {
        if (get("firstTime") && rmh_firstTimeTooltip) {

            let rmh_tooltip = document.createElement("div");
            rmh_tooltip.id = "rmh_tooltip";
            rmh_tooltip.classList.add("speech-bubble-right");
            rmh_tooltip.style.opacity = 0;

            let rmh_tooltip_text = document.createElement("p");
            rmh_tooltip_text.innerText = "Click me to toggle the menu.";

            rmh_tooltip.appendChild(rmh_tooltip_text);
            rmh.appendChild(rmh_tooltip);

            //$(rmh).append('<div id="rmh_tooltip" class="speech-bubble-right" style="opacity: 0"> <p>Click me to toggle the menu.</p> </div>');

            rmh.addEventListener("click", function () {
                document.getElementById("rmh_tooltip").style.opacity = 0;
            });
            setTimeout(function () {
                document.getElementById("rmh_tooltip").style.opacity = 1;
            }, 3000);
            sessionStorage.setItem("firstTime",false);
        }
    }



    //REMOVING ANIMATIONS ON ANIMATION END
    rmh.addEventListener("animationend", function () {
        rmh.classList.remove("rmh_open");
        rmh.classList.remove("rmh_close");
    });

    let rmh_handle = document.getElementById("rmh_handle");
    rmh_handle.addEventListener("animationend", function () {
        rmh_handle.classList.remove("rmh_handle_open");
        rmh_handle.classList.remove("rmh_handle_close");
    });


    // TOGGLING THE MENU
    isRmhOpen = true;
    rmh_handle.onclick = function () {
        if (!isRmhOpen) {
            isRmhOpen = true;
            rmh.classList.remove("rmh_closed");
            rmh.classList.add("rmh_open");
            rmh.classList.add("rmh_opened");

            rmh_handle.classList.remove("rmh_handle_closed");
            rmh_handle.classList.add("rmh_handle_open");
            rmh_handle.classList.add("rmh_handle_opened");
        } else {
            isRmhOpen = false;
            rmh.classList.remove("rmh_opened");
            rmh.classList.add("rmh_close");
            rmh.classList.add("rmh_closed");

            rmh_handle.classList.remove("rmh_handle_opened");
            rmh_handle.classList.add("rmh_handle_close");
            rmh_handle.classList.add("rmh_handle_closed")
        }
    };

    // CLOSING THE MENU AT LOAD
    isRmhOpen = false;
    rmh.classList.remove("rmh_opened");
    rmh.classList.add("rmh_closed");
    rmh_handle.classList.remove("rmh_handle_opened");
    rmh_handle.classList.add("rmh_handle_closed");


});



/**
 * @function
 * @desc automatically opens it after given amount of seconds. (giving the appended font time to load, and making it more noticable).
 * @param seconds {number} - the amount of seconds until the menu opens again.
 */
function rmh_openAfter(seconds) {
    //rmh.style.opacity = 0;
    //rmh.style.transitionDuration = "0.5s";
    setTimeout(function () {
        let rmh = document.getElementById("rmh");
        let rmh_handle = document.getElementById("rmh_handle");
        if (rmh.classList.contains("rmh_closed") === true) {
            isRmhOpen = true;
            rmh.style.opacity = 1;
            rmh.classList.add("rmh_open");
            rmh.classList.add("rmh_opened");
            rmh.classList.remove("rmh_closed");
            rmh_handle.classList.add("rmh_handle_open");
            rmh_handle.classList.add("rmh_handle_opened");
            rmh_handle.classList.remove("rmh_handle_closed");
        }
    }, seconds * 1000);
}

/**
 * @function
 * @desc updates the token count in the universal menu.
 */
function rmh_update() {
    document.getElementById("rmh_tokenCount").innerHTML = "x " + user.tokenManager.getCount();
}