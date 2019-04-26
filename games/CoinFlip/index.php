<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="/0JS/RoyaleSubsystem.js"></script> <!-- Subsystemet -->

      <link href="../../0CSS/universal.css" rel="stylesheet"> <!-- Meny øverst til høyre -->

      <script src="../../0JS/universal_menu.js"></script> <!-- Meny øverst til høyre -->
      <link href="../../0CSS/universal_menu.css" rel="stylesheet"> <!-- Meny øverst til høyre -->

    <script src="coinFlip.js"></script>

    <link rel="stylesheet" href="coinFlip.css">
    <link rel="stylesheet" href="../../0CSS/classes.css">
    <link rel="stylesheet" href="../../0CSS/universal.css">

    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
<div id="documentWrapper">

  <div id="container">


        <div id="penge">
          <div class="side1"></div>
          <div class="side2"></div>
        </div>

          <div id="input">
        Tokens: <input type="number" name="" value=""> <br>

        Select a side to bet on:  <br>

        <div id="velg" class="container row">
            <div id="lilla"> </div>
            <div id="rod"> </div>
        </div>
        <br>

        <button class="retroButton" type="button" id="flip" name="button">Flip</button>
      </div>
  </div>
</div>

  <script type="text/javascript">
      init_royale();
  </script>
      </body>
</html>
