<?php

session_start();
unset($_SESSION['id']);
unset($_SESSION['username']);
unset($_SESSION['oauthProvider']);
session_destroy();
header("location: home.php");

?>
