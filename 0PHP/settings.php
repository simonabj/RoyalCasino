<?php
session_start();
require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: ../hub/index.php");
    exit;
}
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];
$sql3 = "SELECT * FROM users WHERE id=$seBrukerID";
$datasett3 = mysqli_query($tilkobling, $sql3);
$datasett22 = mysqli_query($tilkobling, $sql3);
if(isset($_POST["submit"]))
{
    $sql = sprintf("UPDATE users SET theme='%s' WHERE id=%s",
        $tilkobling->real_escape_string($_POST["txtOppdaternavn1"]),
        $tilkobling->real_escape_string($seBrukerID)
    );
    $tilkobling->query($sql);
    header('Location: settings.php');
}
?>
<!DOCTYPE html>
<html>
<html land="en">
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | Settings</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <link href="stilark.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
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
                <input type="text" name="txtOppdaternavn1" id="txtOppdaternavn1" style="display:none;" value="<?php echo $rad["theme"]; ?>">
            </td>
        </tr>
        <?php } ?>
        </tbody>
    </table>
    <button id="submit" name="submit" value="Oppdater">Oppdater</button>
</form>

<h2 style="width:1000px; text-align: left;margin-left:auto;margin-right:auto;font-size:20px;color:#337ab7;">Profile Pictures</h2>
<form method="post" action="avatarChange.php" enctype="multipart/form-data">
    <table class="innstilling" border="0">
        <tbody>
        <tr>
            <th style="width:631px;">Upload your own(JPEG, JPG, PNG, GIF)</th>
            <td>
                <input type="file" name="avatarToUpload" id="avatarToUpload" style="margin-left:auto;margin-right:auto;text-align:center;color:black;font-size:18px;"><textarea name="usynlig" style="display:none;"><?php echo $seUser; ?></textarea>
            </td>
        </tr>
        <tr>
            <th>Or choose one of the standard profile pictures</th>
            <td><a class="btn" id="standardProfile" href="profilePictures.php">Choose</a></td>
        </tr>
        </tbody>
    </table>
    <button id="submit" name="submit" value="Upload Avatar">Change Profilepicture</button>
</form>

<h2 style="width:1000px; text-align: left;margin-left:auto;margin-right:auto;font-size:20px;color:#337ab7;">Security</h2>
<table class="innstilling" border="0">
    <tbody>
    <tr>
        <th style="width:631px;">Change your password</th>
        <td><a href="reset-password.php" class="btn" id="endrePassord">Change</a></td>
    </tr>
    <tr>
        <th style="width:631px;">Logged In Devices</th>
        <td><a id="showIP" class="btn" href="innloggedeEnheter.php">Logged Devices</a></td>
    </tr>
    </tbody>
</table>



<script>
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
        var theme=document.querySelector("#txtOppdaterNavn1").value;
        console.log("Oppdaterer Innstillinger.");
        $.ajax({url: "refreshSettings.php?theme="+theme})
    }

</script>
</body>
</html>