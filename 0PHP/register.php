<?php
require_once "config.php"; /*Henter config filen som kobler til databasen*/

$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr"); /*Database connection*/

if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";

/*Koden som kjøres ved registrering*/
if($_SERVER["REQUEST_METHOD"] == "POST"){

    /*Valider brukernavnet*/
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        $sql = "SELECT id FROM users WHERE username = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            /*Set en variabel for brukernavnet til senere bruk*/
            $param_username = trim($_POST["username"]);

            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);

                /*Beskjed om at brukernavnet allerede er tatt*/
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later."; /*Feilmelding*/
            }
        }

        mysqli_stmt_close($stmt);
    }

    /*Sjekk på mailen*/
    if(empty(trim($_POST["mail"]))){
        $mail_err = "Please enter a mail adress.";
    } else{
        $sql = "SELECT id FROM users WHERE mail = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_mail);

            /*Lagring av mailen som en parameter*/
            $param_mail = trim($_POST["mail"]);

            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);

                /*Melding om at mailen allerede er i bruk*/
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $mail_err = "This mail is already in use.";
                } else {
                    $mail = trim($_POST["mail"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        mysqli_stmt_close($stmt);
    }

    /*Sjekk av passord feltet*/
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }

    /*Sjekk av confirm passord feltet*/
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }

    /*Hvis alt er riktig skal det legges inn i databasen*/
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($mail_err)){

        $sql = "INSERT INTO users (username, password, mail) VALUES (?, ?, ?)"; /*Setningen for å legge til verdiene til databasen*/

        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "sss", $param_username, $param_password, $param_mail);

            $param_username = $username;
            $param_mail = $mail;
            $param_password = password_hash($password, PASSWORD_DEFAULT); /*Kryptere passord*/

            if(mysqli_stmt_execute($stmt)){
                header("location: login.php"); /*Sendes tilbake til innloggingssiden*/
                /*oppdaterOgVidereled();*/
            } else{
                echo "Something went wrong. Please try again later."; /*Melding om at noe gikk galt i registreringsprosessen*/
            }

        }
        mysqli_stmt_close($stmt);
    }
    mysqli_close($link);
}

/*
$userInvite = $_GET['userInvite']; Definere hvem som har invitert deg
function oppdaterOgVidereled() {
    Hvis hvem som har invitert deg er definert skal verdien til antall inviterte personer økes med 1
    if (!empty($userInvite)) {
        $sqlQueryLine = "SELECT * FROM users WHERE id=$userInvite";
        $sqlQuery = mysqli_query($tilkobling, $sqlQueryLine);
        while ($row = mysqli_fetch_array($sqlQuery)) {
            $amountOfInvites = $row['amountInvites']+1;
        };

        $updateAmountOfInvites = sprintf("UPDATE users SET amountInvites=%s WHERE id=%s",
            $tilkobling->real_escape_string($amountOfInvites),
            $tilkobling->real_escape_string($userInvite)
        );
        $tilkobling->query($updateAmountOfInvites); Oppdatere databasen
    }
    header("location: login.php"); Sendes tilbake til innloggingssiden
}
*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body>
<div class="wrapper" style="text-align:center;text-align-last:center; margin-left:auto;margin-right:auto">
    <h2>Register</h2>
    <p>Fill out the fields below to be able to play on Casino Royale.</p>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
            <label>Brukernavn</label>
            <input type="text" name="username" class="form-control" value="<?php echo $username; ?>" autocomplete="off">
            <span class="help-block"><?php echo $username_err; ?></span>
        </div>
        <div class="form-group <?php echo (!empty($mail_err)) ? 'has-error' : ''; ?>">
            <label>Mail</label>
            <input type="text" name="mail" class="form-control" value="<?php echo $mail; ?>" autocomplete="off">
            <span class="help-block"><?php echo $mail_err; ?></span>
        </div>
        <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
            <label>Passord</label>
            <input type="password" name="password" class="form-control" value="<?php echo $password; ?>" autocomplete="off">
            <span class="help-block"><?php echo $password_err; ?></span>
        </div>
        <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
            <label>Bekreft Passordet</label>
            <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>" autocomplete="off">
            <span class="help-block"><?php echo $confirm_password_err; ?></span>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Submit">
            <input type="reset" class="btn btn-default" value="Reset">
        </div>
        <p>Already registered? <a href="login.php">Login here</a>.</p>
    </form>
</div>
</body>
</html>
