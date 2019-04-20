// APPENDING THE ICON-FONT TO HEAD
$(function () {
    $('head').append('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">');

    // To change where the "home" button redirects, change this variable before the page is loaded (before the "body" tag). (not sure if this works yet)
    let rmh_href = "../../hub/index.php";

    // GENERATING THE HANDLE ELEMENT
    let rmh = document.createElement("div");
    rmh.id = "rmh";
    rmh.classList.add("container");
    rmh.innerHTML = '' +
        '        <img id="rmh_handle" src="../../resources/redChip.png">\n' +
        '\n' +
        '        <div id="rmh_bar">\n' +
        '\n' +
        '            <div class="pointer rmh_item">\n' +
        '                <i class="fas fa-home" onclick="window.location.href=\' ' + rmh_href + ' \'"></i>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="rmh_item" id="rmh_tokenCountItem">\n' +
        '                <div class="container row">\n' +
        '                    <img src="../../resources/redChip.png" alt="token" class="rmh_token">\n' +
        '                    <p id="rmh_tokenCount"> x 400</p>\n' +
        '                    <script> document.getElementById("rmh_tokenCount").innerHTML = "x " + getUser().tokenManager.getCount(); </script>\n' +
        '                </div>\n' +
        '                <button class="retroButton" onclick="">get more</button>\n' +
        '            </div>\n' +
        '        </div>\n';

    document.body.appendChild(rmh);


    /* structure:
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
    if (get("firstTime")) {
        $(rmh).append('<div id="rmh_tooltip" class="speech-bubble-right" style="opacity: 0"> <p>Click me to toggle the menu.</p> </div>');
        rmh.addEventListener("click", function () {$("#rmh_tooltip")[0].style.opacity = 0;});
        setTimeout(function () { $("#rmh_tooltip")[0].style.opacity = 1; }, 3000);
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
    let isRmhOpen = true;
    $(rmh_handle).on({
        click: function () {
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
        },
    });


    // MAKING THE MENU APPEAR ONLY AFTER 1 SECOND (giving the appended font time to load, and making it more noticable).
    rmh.style.opacity = 0;
    rmh.style.transitionDuration = "0.5s";
    setTimeout(function () {
        rmh.style.opacity = 1;
        rmh.classList.add("rmh_open");
        rmh.classList.add("rmh_opened");
        rmh_handle.classList.add("rmh_handle_open");
        rmh_handle.classList.add("rmh_handle_opened");
        setTimeout(function () {
            rmh.style.transitionDuration = "initial";
        }, 500);
    }, 1000);



});