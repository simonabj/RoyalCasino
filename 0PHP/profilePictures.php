<?php
session_start(); /*Starte session*/

require_once "config.php"; /*Koble seg til configurasjonsfilen*/

/*Hvis ikke logget inn ta brukeren til innloggingssiden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr"); /*Tilkobling til databasen*/

/*Sette typen til UTF8 for å kunne bruke Æ, Ø, Å*/
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

/*Definere session variabler*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

/*Lage en spørresetning for informasjonen som skal vises på siden og lage datasett som kan vise det til brukeren*/
$sql = "SELECT * FROM users WHERE id=$seBrukerID";
$datasett = $tilkobling -> query($sql);
$datasett2 = $tilkobling -> query($sql);

/*Når man klikker på oppdater profilbilde vil profilbildet endres der bruker ID'en er lik brukeren som browser*/
if(isset($_POST["submit"]))
{
    $sql2 = sprintf("UPDATE users SET profilePicture='%s' WHERE id=%s",
        $tilkobling->real_escape_string($_POST["valgtProfilbilde"]),
        $tilkobling->real_escape_string($seBrukerID)
    );
    $tilkobling->query($sql2);
    header('Location: settings.php'); /*Når alt er ferdig kjørt tas du tilbake til samme side*/
}
?>
<!DOCTYPE html>
<html>
<html land="en">
<head>
  <meta charset="UTF-8">
  <title>Casino Royale | Profile Pictures</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> <!-- CSS -->
  <link href="stilark.css" rel="stylesheet" type="text/css"> <!-- CSS Stilark -->
  <style>
      body{
          font: 14px sans-serif;
          text-align: center;
      }
      h1 {
          color: white;
      }
      .fa, .fas, .far {
          font-weight: 1000;
      }
      .avatarProfil {
        width: 13.75vw;
      }
      #profilBildeTabell {
        width: 98vw;
        margin-left: auto;
        margin-right: auto;
      }
      #profilBildeTabell th {
        padding: 0;
      }
      button {
      	background:linear-gradient(to bottom, #4267b2 5%, #4267b2 100%);
      	background-color:#4267b2;
      	border-radius:28px;
      	display:inline-block;
      	cursor:pointer;
      	color:#ffffff;
      	font-family:Arial;
      	font-size:28px;
      	padding:10px 15px;
      	text-decoration:none;
      	text-shadow:0px 2px 0px #2f6627;
        outline:none;
      }
      button:hover {
      	background:linear-gradient(to bottom, #29487d 5%, #29487d 100%);
      	background-color:#29487d;
      }
      button:active {
      	position:relative;
      	top:1px;
      }
  </style>
</head>
<body>

<h2 style="text-align:center;color:white;font-size:35px;">Choose a profile picture</h2>
<!-- Visning av alle standardprofilbildene man kan velge mellom -->
<form id="oppdaterattraksjon" name="oppdaterattraksjon" method="POST">
  <?php while($rad = mysqli_fetch_array($datasett)) { ?>
  <table id="profilBildeTabell" border="0">
    <tbody>
      <tr>
        <td onclick="profileF()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 1</p><img src="ProfilePictures/avatar.png" class="avatarProfil" id="profile" /></td>
        <td onclick="profileF2()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 2</p><img src="ProfilePictures/avatar2.png" class="avatarProfil" id="profile2" /></td>
        <td onclick="profileF3()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 3</p><img src="ProfilePictures/avatar3.png" class="avatarProfil" id="profile3" /></td>
        <td onclick="profileF4()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 4</p><img src="ProfilePictures/avatar4.png" class="avatarProfil" id="profile4" /></td>
        <td onclick="profileF5()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 5</p><img src="ProfilePictures/avatar5.png" class="avatarProfil" id="profile5" /></td>
        <td onclick="profileF9()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 6</p><img src="ProfilePictures/avatar9.png" class="avatarProfil" id="profile9" /></td>
      </tr>
      <tr>
        <td onclick="profileF6()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 7</p><img src="ProfilePictures/avatar6.png" class="avatarProfil" id="profile6" /></td>
        <td onclick="profileF7()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 8</p><img src="ProfilePictures/avatar7.png" class="avatarProfil" id="profile7" /></td>
        <td onclick="profileF10()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 9</p><img src="ProfilePictures/avatar10.png" class="avatarProfil" id="profile10" /></td>
        <td onclick="profileF8()" style="text-align:center;"><p style="text-align:center;color:white;">Standard 10</p><img src="ProfilePictures/avatar8.png" class="avatarProfil" id="profile8" /></td>
        <td onclick="profileV()" style="text-align:center;"><p style="text-align:center;color:white;">Current Profilepicture</p><img src="ProfilePictures/<?php echo $rad['profilePicture']; ?>" class="avatarProfil" id="profileOG" /></td>
      </tr>
      <input type="text" name="valgtProfilbilde" id="valgtProfilbilde" style="display:none;">
    </tbody>
  </table>
  <button value="Tilbake"><a href="settings.php" style="color:white;text-decoration:none;">Abort</a></button> <!-- Knapp for å ta deg tilbake til innstillinger -->
  <button name="submit" value="Update Profile Picture">Choose Profile Picture</button> <!-- Knapp for å endre profilbilde til det valgte -->
  <?php } ?>
</form>

<script>
    /*Definering av variablene som skal brukes til å endre profilbilde variablen*/
var profile1=document.getElementById("profile");
var profile2=document.getElementById("profile2");
var profile3=document.getElementById("profile3");
var profile4=document.getElementById("profile4");
var profile5=document.getElementById("profile5");
var profile6=document.getElementById("profile6");
var profile7=document.getElementById("profile7");
var profile8=document.getElementById("profile8");
var profile9=document.getElementById("profile9");
var profile10=document.getElementById("profile10");
var valgtProfilbilde=document.getElementById("profileOG");

var valgtProfilbildeEl=document.getElementById("valgtProfilbilde");
profileV();

function profileF() {
  profile1.style.border="10px solid #4267b2";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar.png";
}
function profileF2() {
  profile1.style.border="";
  profile2.style.border="10px solid #4267b2";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar2.png";
}
function profileF3() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="10px solid #4267b2";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar3.png";
}
function profileF4() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="10px solid #4267b2";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar4.png";
}
function profileF5() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="10px solid #4267b2";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar5.png";
}
function profileF6() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="10px solid #4267b2";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar6.png";
}
function profileF7() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="10px solid #4267b2";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar7.png";
}
function profileF8() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="10px solid #4267b2";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar8.png";
}
function profileF9() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="10px solid #4267b2";
  profile10.style.border="";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar9.png";
}
function profileF10() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="10px solid #4267b2";
  profileOG.style.border="";
  valgtProfilbildeEl.value="avatar10.png";
}
<?php while($rad = mysqli_fetch_array($datasett2)) { ?>
function profileV() {
  profile1.style.border="";
  profile2.style.border="";
  profile3.style.border="";
  profile4.style.border="";
  profile5.style.border="";
  profile6.style.border="";
  profile7.style.border="";
  profile8.style.border="";
  profile9.style.border="";
  profile10.style.border="";
  profileOG.style.border="10px solid #4267b2";
  valgtProfilbildeEl.value="<?php echo $rad['profilBilde']; ?>";
}
<?php } ?>
</script>
  </body>
</html>
