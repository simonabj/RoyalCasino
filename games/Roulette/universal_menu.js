$(function () {

    // GENERATING THE HANDLE ELEMENT

    /*let rmh = document.createElement("div");
    rmh.id = "rmh";

    rmh.innerHTML = "<div id='rmh' class='container'>\n" +
        "\n" +
        "        <img id='rmh_handle' src='../../resources/redChip.png'>\n" +
        "\n" +
        "        <div id='rmh_bar'>\n" +
        "\n" +
        "            <div class='pointer rmh_item'>\n" +
        "                <h1 onclick='window.location.href='../../hub/index.php''>🏠</h1>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class='rmh_item'>\n" +
        "                <img src='../../resources/greenChipShit.png' alt='' class='rmh_token'>\n" +
        "                <button class='retroButton' onclick=''>buy</button>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class='rmh_item'>\n" +
        "                <img src='../../resources/redChip.png' alt='' class='rmh_token'>\n" +
        "                <button class='retroButton' onclick=''>buy</button>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class='rmh_item'>\n" +
        "                <img src='../../resources/greenChipShit.png' alt='' class='rmh_token'>\n" +
        "                <button class='retroButton' onclick=''>buy</button>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class='rmh_item'>\n" +
        "                <img src='../../resources/redChip.png' alt='' class='rmh_token'>\n" +
        "                <button class='retroButton' onclick=''>buy</button>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>";
    document.body.appendChild(rmh);*/



    let rmh = document.getElementById("rmh");
    rmh.addEventListener("animationend", function () {
        rmh.classList.remove("rmh_open");
        rmh.classList.remove("rmh_close");
    });

    let rmh_handle = document.getElementById("rmh_handle");
    rmh_handle.addEventListener("animationend", function () {
        rmh_handle.classList.remove("rmh_handle_open");
        rmh_handle.classList.remove("rmh_handle_close");
    });

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



});