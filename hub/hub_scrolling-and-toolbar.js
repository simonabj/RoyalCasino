$(function () {

// _____________________________________ SCROLLING ______________________________________

    let headerTransitionDuration = 0.25;
    let header = document.querySelector("header");
    let div = document.getElementsByClassName("titleDiv")[0];
    let symbol = document.getElementById("headerSymbol");
    header.style.transitionDuration = headerTransitionDuration + "s";
    div.style.transitionDuration = headerTransitionDuration + "s";
    symbol.style.transitionDuration = headerTransitionDuration + 0.2 + "s";
    let headerToggled = false;
    let shrinkOn = 25;

    let doesFooterHide = false;
    let footer = document.getElementById("footer");
    let footerToggled = false;
    (doesFooterHide === true) ? footer.style.opacity = 0 : footer.style.opacity = 1;



// SCROLLING
    window.onscroll = function () {

        /** distanceY is the distance in pixels scrolled from the top of the document. */
        let distanceY = window.pageYOffset || document.documentElement.scrollTop;

        //HEADER
        /** If scrolled distance is larger than shrinkOn, styles the header to minimize it, else, styles the header back to initial values. */
        // CLOSING HEADER
        if (distanceY > shrinkOn && headerToggled === false) {
            $("#toolbarTooltip").hide();
            headerToggled = true;
            //header.style.fontSize = "10px";
            div.querySelector("h1").style.fontSize = "20pt";

            closeToolbar("no animation");
            //symbol.style.top = "160px";
            symbol.classList.add("symbolHideAnimation");

            setTimeout(function () {
                toolbarLeft.style.zIndex = "-100";
                toolbarRight.style.zIndex = "-100";
                symbol.style.opacity = 0;
                //document.getElementById("gamesContainer").scrollIntoView({block: "center", behavior: "smooth"});
                header.style.clipPath = "polygon(0 0, 100% 0, 50vw 35%, 0 calc(50% - 50%))";
                header.style.padding = 0;
                header.style.height = "50px";
                div.style.top = "-25px";
                div.classList.remove("shape-bat");
                div.classList.add("shape-bat-top");
                setTimeout(function () {
                    symbol.style.top = "-15px";
                }, 250)
            }, 250);


            // OPENING HEADER
        } else if (distanceY < shrinkOn && headerToggled) {

            headerToggled = false;
            header.style.clipPath = "polygon(0 0, 100% 0, 50vw 100%, 0 calc(50% - 50%))";
            header.style.padding = "initial";
            header.style.height = "initial";
            div.style.height = "initial";
            div.classList.remove("shape-bat-top");
            div.classList.add("shape-bat");
            //symbol.style.top = "40px";
            //symbol.style.transform = "scale(0.2)";

            setTimeout(function () {
                toolbarLeft.style.zIndex = "9";
                toolbarRight.style.zIndex = "9";
                symbol.style.opacity = 1;
                div.style.position = "fixed";
                div.style.top = "4px";
                div.querySelector("h1").style.fontSize = "27pt";
                //header.style.fontSize = "initial";
                symbol.classList.add("symbolShowAnimation");
                setTimeout(function () {
                    symbol.style.top = "160px";
                    symbol.style.transform = "";
                }, 200)
            }, 200);

        }


        // FOOTER
        /** If bottom of page reached, footer opacity is set to 1, else, footer opacity is set to 0. */
        if (doesFooterHide && footerToggled === false && document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
            footer.style.opacity = 1;
            footerToggled = true;
        } else if (doesFooterHide && footerToggled) {
            footer.style.opacity = 0;
            footerToggled = false;
        }

    };



// _______________ TOOLBAR ___________________



    let toolbarLeft = document.getElementById("toolbarLeft");
    let toolbarRight = document.getElementById("toolbarRight");
    toolbarLeft.justifyContent = "space-around";
    toolbarRight.justifyContent = "space-around";
    let toolbarItem = $(".toolbarItem");
    let openedClipPath = "polygon(100% 0%, 85% 50%, 100% 100%, 25% 75%, 15% 50%, 25% 25%)";
    let closingClipPath = "polygon(50% 0%, 30% 50%, 50% 100%, 25% 75%, 15% 50%, 25% 25%)";
    let closedClipPath = "polygon(25% 4.5%, 15% 50%, 25% 95.5%, 20.5% 75%, 15% 50%, 20.5% 25%)";
    let isToolbarOpen = false;

    /**
     * method closeToolbar plays appropriate animation and hides the toolbar.
     */
    function closeToolbar() {
        isToolbarOpen = false;
        toolbarLeft.style.right = "33%";
        toolbarRight.style.left = "33%";
        toolbarItem[0].style.transitionDuration = "0.30s";
        toolbarItem[1].style.transitionDuration = "0.30s";
        toolbarItem[0].style.transitionTimingFunction = "linear";
        toolbarItem[1].style.transitionTimingFunction = "linear";
        toolbarItem[0].style.clipPath = closedClipPath;
        toolbarItem[1].style.clipPath = closedClipPath;
        $("#logoutButton").hide();
    }



    /**
     * method openToolbar plays appropriate animation and shows the toolbar.
     */
    function openToolbar() {
        isToolbarOpen = true;
        toolbarLeft.style.right = "55%";
        toolbarRight.style.left = "55%";
        toolbarItem[0].style.transitionDuration = "0.350s";
        toolbarItem[1].style.transitionDuration = "0.350s";
        toolbarItem[0].style.clipPath = openedClipPath;
        toolbarItem[1].style.clipPath = openedClipPath;
        toolbarLeft.style.opacity = 1;
        toolbarRight.style.opacity = 1;

    }



    closeToolbar();



    /**
     * method toolbarToggle opens the toolbar if it's closed, and vice-versa.
     */
    function toolbarToggle(animation) {

        if (!isToolbarOpen) {

            symbol.classList.remove("toolbarCloseAnimation");
            symbol.classList.remove("toolbarOpenAnimation");
            openToolbar();
            if (animation !== "no animation") symbol.classList.add("toolbarOpenAnimation");
            isToolbarOpen = true;

        } else {

            symbol.classList.remove("toolbarOpenAnimation");
            symbol.classList.remove("toolbarCloseAnimation");
            if (animation !== "no animation") symbol.classList.add("toolbarCloseAnimation");
            setTimeout(function () {
                closeToolbar();
                isToolbarOpen = false;
            }, 200);
        }
    }



// RUNS FUNCTION toolbarToggle() WHEN THE HEADER IS CLICKED. And brightens it when hovered. Done with JS instead of CSS, as the CSS psuedoselector :hover made the animations stutter.
    $("#headerSymbol").on({
        click: function () {
            toolbarToggle();
        },
        mouseenter: function () {
            $(this).css("filter", "brightness(115%)");
        },
        mouseleave: function () {
            $(this).css("filter", "brightness(100%)");
        }
    });

    symbol.addEventListener("animationend", function () {
        symbol.classList.remove("toolbarOpenAnimation");
        symbol.classList.remove("toolbarCloseAnimation");
        symbol.classList.remove("symbolShowAnimation");
        symbol.classList.remove("symbolHideAnimation");
    });




    let isProfileHover = false;
    $("#profileSettings").on({
        click: function () {
            window.location.href = "../0PHP/settings.php";
        },
        mouseenter: function () {
            isProfileHover = true;
            $("#logoutButton").show();
        },
        mouseleave: function () {
            isProfileHover = false;
            setTimeout(function () {
                if (!isLogoutHover && !isProfileHover) {
                    $("#logoutButton").hide();
                }
            }, 750);
        }
    });
    let isLogoutHover = false;
    $("#logoutButton").on({
        click: function () {
            window.location.href = "../0PHP/logout.php";
        },
        mouseenter: function () {
            isLogoutHover = true;
        },
        mouseleave: function () {
            isLogoutHover = false;
            $("#logoutButton").hide();
        }
    });

    div.style.top = "-50px";
    symbol.classList.add("symbolShowAnimation");
    div.style.transitionDuration = "initial";
    div.querySelector("h1").classList.add("tracking-in-expand-fast");
    setTimeout(function () {
        div.style.transitionDuration = "0.5s";
        div.style.top = "10px";
        symbol.style.top = "160px";
        symbol.style.transform = "";
        setTimeout(function () {
            div.style.transitionDuration = "0.25s";
        }, 501);
    }, 200);



});