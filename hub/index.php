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
        <button onclick="window.location.href='../games/snake/index.php'/*redirect to money-buying-place*/" class="retroButton"
                style="background-color: purple; color: yellow; margin-bottom: 4px;">BUY
        </button>
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
    <div id="hof_containerBorder">
        <div id="hof_container">
            <h1 id="hof_title" class="title">Hall of Fame</h1>
            <table id="hof_table">
                <tbody><tr id="hof_headerRow">
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
                </tbody><tr id="hof_1stPlace"><td>1.</td><td id="hof_rank1-username">Chris</td><td id="hof_rank1-balance">1453375</td><td id="hof_rank1-date">Mon Apr 15 2019</td></tr><tr id="hof_2ndPlace"><td>2.</td><td id="hof_rank2-username">DivineChili</td><td id="hof_rank2-balance">1104923</td><td id="hof_rank2-date">Mon Apr 15 2019</td></tr><tr id="hof_3rdPlace"><td>3.</td><td id="hof_rank3-username">Testuser</td><td id="hof_rank3-balance">5574</td><td id="hof_rank3-date">Mon Apr 15 2019</td></tr><tr class="hof_lowerRanked"><td>4.</td><td id="hof_rank4-username">Eirik</td><td id="hof_rank4-balance">880</td><td id="hof_rank4-date">Fri Apr 26 2019</td></tr><tr class="hof_lowerRanked"><td>5.</td><td id="hof_rank5-username">qwe</td><td id="hof_rank5-balance">503</td><td id="hof_rank5-date">Mon Apr 15 2019</td></tr><tr class="hof_lowerRanked"><td>6.</td><td id="hof_rank6-username">wagabobo</td><td id="hof_rank6-balance">500</td><td id="hof_rank6-date">Sat Apr 20 2019</td></tr><tr class="hof_lowerRanked"><td>7.</td><td id="hof_rank7-username">mufasa</td><td id="hof_rank7-balance">500</td><td id="hof_rank7-date">Sat Apr 20 2019</td></tr><tr class="hof_lowerRanked"><td>8.</td><td id="hof_rank8-username">watta</td><td id="hof_rank8-balance">500</td><td id="hof_rank8-date">Sat Apr 20 2019</td></tr><tr class="hof_lowerRanked"><td>9.</td><td id="hof_rank9-username">Ewq</td><td id="hof_rank9-balance">500</td><td id="hof_rank9-date">Thu Apr 18 2019</td></tr><tr class="hof_lowerRanked"><td>10.</td><td id="hof_rank10-username">asda</td><td id="hof_rank10-balance">500</td><td id="hof_rank10-date">Thu May 02 2019</td></tr></table>
        </div>
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

    // todo - expand on, and change to make it look better, :
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
