<?php
session_start(); /*Starte en session for å hente verdiene lagret*/

require_once "../0PHP/config.php"; /*Hente konfigurasjonsbitene*/

$id = $_SESSION["id"];
$sql = "SELECT * FROM users WHERE id=$id";
$query = mysqli_query($link, $sql);
$value = mysqli_fetch_object($query);
$theme = $value->theme;
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> Casino Royale - Hub </title>
    <link rel="icon" href="https://i.imgur.com/KIEjXV8.png">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
    <!--|Montserrat|Open+Sans|Raleway|Roboto-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="../0JS/RoyaleSubsystem.js"></script>

    <script src="../0JS/oddUtilities.js"></script>
    <link href="../0CSS/classes.css" rel="stylesheet">
    <link href="../0CSS/universal.css" rel="stylesheet">

    <!--<link rel="stylesheet" href="../0CSS/universal_menu.css">
    <script src="../0JS/universal_menu.js">rmh_href = "../0PHP/login.php";</script>-->

    <link href="hub.css" rel="stylesheet">
    <script src="hub_games.js"></script>
    <script src="hub_scrolling-and-toolbar.js"></script>

    <link href="hall_of_fame.css" rel="stylesheet">

</head>
<body>


<!-- HEADER -->
<span id="headerSpan" class="clipPathShadow">
    <header style="position: fixed; z-index: 5;" class="clipPathShadow">
        <div class="column container div clipPathShadow"></div>
    </header>
</span>
<!-- END OF HEADER -->


<!-- TOOLBAR -->
<div id="toolbarLeft" class="toolbar">
    <div class="toolbarItem">
        <div class="container row" id="tokenCountDiv">
            <img src="https://i.imgur.com/KIEjXV8.png" alt="token" id="tokenCountToken">
            <p id="tokenCount">x 2500</p>
        </div>
        <button onclick="/*switch to + material icon, redirecting to money-buying-place*/" class="retroButton"
                style="background-color: purple; color: yellow; margin-bottom: 4px;">BUY
        </button>
        <!-- todo: redirect til buying place?  eller:når man trykker på "BUY" knappen så vises en meny med fem options til høyre, man trykker på en option for å kjøpe. -->
        <script> $(function () {
                setTimeout(function () {
                    document.getElementById("tokenCount").innerText = "x " + getUser().tokenManager.getCount();
                }, 100)
            }); </script>
    </div>
</div>
<div id="toolbarRight" class="toolbar">
    <div id="profileSettings" class="toolbarItem"><p>Profile Settings</p></div>
    <div id="logoutButton"><p>logout</p></div>
</div>
<!-- END OF TOOLBAR -->


<!-- DOCUMENT WRAPPER -->
<div id="documentWrapper" class="container column" style="margin-top: 325px">


    <!-- HEADER ELEMENTS -->
    <img id="headerSymbol" src="../resources/redChip.png" draggable="false">

    <div id="toolbarTooltip" class="speech-bubble" style="display: none"><p>Click me to open the toolbar.</p></div>
    <script> $(function () {
            if (get("firstTime")) {
                $("#toolbarTooltip").fadeIn();
                $("#headerSymbol")[0].addEventListener("click", function () {
                    $("#toolbarTooltip").hide();
                });
            }
        }); </script>

    <div class="titleDiv shape-bat blackText div" style="border-radius: 0; min-height: 50px; top: 10px;">
        <h1>Casino Royale!</h1>
    </div>
    <!-- END OF HEADER ELEMENTS -->


    <!-- the games -->
    <div id="gamesTableBorder">
        <div id="gamesTable"></div>
    </div>


    <!-- text box -->
    <span><br><br><br><br><br><br><br><br></span>
    <div id="hof_container">
        <h1 id="hof_title">Hall of Fame</h1>
        <table id="hof_table">
            <tr id="hof_headerRow">
                <th>Rank</th>
                <th>Username</th>
                <th>Balance</th>
                <th>Joined</th>
            </tr>

            <script>

                (async () => {
                    /**
                     * @type {{username:string, balance:number, created_at:string}[]}
                     */
                    let top_players = await querySQL("SELECT username,balance,created_at FROM users ORDER BY balance DESC LIMIT 10");

                    let i = 1;

                    for(let player of top_players) {

                        let tr = document.createElement("tr");

                        if(i === 1) tr.setAttribute("id", "hof_1stPlace");
                        else if(i === 2) tr.setAttribute("id", "hof_2ndPlace");
                        else if(i === 3) tr.setAttribute("id", "hof_3rdPlace");
                        else tr.setAttribute("class", "hof_lowerRanked");

                        let td1 = document.createElement("td");
                        let td2 = document.createElement("td");
                        let td3 = document.createElement("td");
                        let td4 = document.createElement("td");

                        td1.innerText = i + ".";
                        td2.innerText = player.username;
                        td3.innerText = player.balance;
                        td4.innerText = (new Date(player.created_at.replace(/-/g, "/"))).toDateString();

                        td2.setAttribute("id", "hof_rank" + i + "-username");
                        td3.setAttribute("id", "hof_rank" + i + "-balance");
                        td4.setAttribute("id", "hof_rank" + i + "-date");

                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);

                        document.getElementById("hof_table").appendChild(tr);

                        i++;
                    }

                }).call();
            </script>
        </table>
    </div>

    <span><br><br><br><br><br><br><br><br></span>


    <!-- footer -->
    <div id="footer">

        <div class="lowBound">
            <p>CSS by Julian</p>
            <p>Subsystems by Simon B</p>
        </div>

        <div class="column square secondaryVariant">
            <p contenteditable="true"> This is a footer! Isn't it neat? </p>
            <p style="font-family: 'MS PMincho',serif"> ロイヤルーカジノ</p>
        </div>

        <div class="lowBound">
            <p>PHP by Simon L</p>
            <p>Games by everyone</p>
        </div>

    </div>

</div> <!-- end of document wrapper -->
<script>
    init_royale();

    // todo - expand on
    let theme = "<?php echo $theme; ?>";
    if (theme === "Dark") {
        let root = $(':root')[0];
        root.css('--primary', 'black');
        root.css('--primaryVariant', 'black');
        root.css('--secondary', 'blue');
        root.css('--secondaryVariant', 'blue');
        root.css('--background', 'black');
        root.css('--background', 'black');
    }

</script>
</body>
</html>
