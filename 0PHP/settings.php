<?php
session_start();
require_once "config.php"; /*Connect til database*/

/*Hvis man ikke er logget inn blir man sendt til innloggingssiden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

/*Definer SESSION variabler til senere bruk*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

/*Querys til bruk senere i koden*/
$sql3 = "SELECT * FROM users WHERE id=$seBrukerID"; /*Spørresetning*/
$datasett3 = mysqli_query($link, $sql3); /*Datasett*/
$datasett22 = mysqli_query($link, $sql3); /*Datasett*/
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | Settings</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> <!-- Stilark for enkelte deler -->
    <link href="stilark.css" rel="stylesheet" type="text/css"> <!-- Stilark -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> <!-- jQuery -->
    
    <link href="../../0CSS/universal.css" rel="stylesheet"> <!-- Meny øverst til høyre -->
    <script src="../../0JS/universal_menu.js"></script> <!-- Meny øverst til høyre -->
    <link href="../../0CSS/universal_menu.css" rel="stylesheet"> <!-- Meny øverst til høyre -->
</head>
<body>

<h2 style="width:1000px; text-align: left;margin-left:auto;margin-right:auto;font-size:20px;color:#337ab7;">Settings</h2>
<form id="oppdaterattraksjon" name="oppdaterattraksjon" method="POST">
    <?php if($rad = mysqli_fetch_array($datasett3)) { ?>
    <table class="innstilling" id="innstillinger" border="0">
        <tbody>
        <tr>
            <th title="Choose a theme." style="width:631px;">Dark Theme</th>
            <td>
                <label class="switch">
                    <input type="checkbox" id="sliderTheme">
                    <span class="slider round"></span>
                </label>
                <input type="text" name="txtOppdaternavn1" id="txtOppdaternavn1" style="display:none;" value="<?php echo $rad["theme"]; ?>"> <!-- Element som rommer verdien til temaverdi -->
            </td>
        </tr>
        <?php } ?>
        </tbody>
    </table>
</form>

<h2 style="width:1000px; text-align: left;margin-left:auto;margin-right:auto;font-size:20px;color:#337ab7;">Profile Pictures</h2>
<form method="post" action="avatarChange.php" enctype="multipart/form-data">
    <table class="innstilling" border="0">
        <tbody>
        <tr>
            <th style="width:631px;">Upload your own(JPEG, JPG, PNG, GIF)</th>
            <td>
                <!-- Opplastningsfelt for profilbilde, leder til en ny side(avatarChange.php) når man klikker på knappen under. -->
                <input type="file" name="avatarToUpload" id="avatarToUpload" style="margin-left:auto;margin-right:auto;text-align:center;color:black;font-size:18px;"><textarea name="usynlig" style="display:none;"><?php echo $seUser; ?></textarea>
            </td>
        </tr>
        <tr>
            <th>Or choose one of the standard profile pictures</th>
            <td><a class="btn" id="standardProfile" href="profilePictures.php">Choose</a></td>
        </tr>
        </tbody>
    </table>
    <button id="submit" name="submit" value="Upload Avatar">Change Profilepicture</button> <!-- Knapp for opplastning av profilbilde -->
</form>

<!-- Sikkerhet for brukeren -->
<h2 style="width:1000px; text-align: left;margin-left:auto;margin-right:auto;font-size:20px;color:#337ab7;">Security</h2>
<table class="innstilling" border="0">
    <tbody>
    <tr>
        <th style="width:631px;">Change your password</th>
        <td><a href="reset-password.php" class="btn" id="endrePassord">Change</a></td> <!-- Endring av passord -->
    </tr>
    <tr>
        <th style="width:631px;">Logged In Devices</th>
        <td><a id="showIP" class="btn" href="innloggedeEnheter.php">Logged Devices</a></td> <!-- Se hvem og hvor man har logget seg inn på brukeren fra -->
    </tr>
    </tbody>
</table>



<script>
    init_royale();
    saveUser(user); /*Oppdatere til session storage*/
    rmh_update(); /*Oppdater token visning i universel menu*/
    
    /*Get variables to use later*/
    var txtOppdaternavn1El = document.querySelector("#txtOppdaternavn1");
    var sliderThemeEl = document.querySelector("#sliderTheme");
    sliderThemeEl.addEventListener("input", innstillingerEndre); /*Triggers the change of settings on flick*/
    if (txtOppdaternavn1El.value==="Dark") {
        sliderThemeEl.checked = true;
    }

    /*Change value that manages the dark theme knode, triggered when slider is flicked*/
    function innstillingerEndre() {
        /*SLIDER TILBAKEMELDINGER*/
        if (sliderThemeEl.checked == true) {
            txtOppdaternavn1El.value="Dark";
        } else if (sliderThemeEl.checked == false) {
            txtOppdaternavn1El.value="Regular";
        }
        updateSettings();
    }

    /*Run a file to update values in database*/
    function updateSettings() {
        var theme=document.querySelector("#txtOppdaternavn1").value;
        console.log("Oppdaterer Innstillinger.");
        $.ajax({url: "refreshSettings.php?theme="+theme})
    }

</script>
</body>
</html>
