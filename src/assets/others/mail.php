<html>
<head>

</head>
<body>
<?php
// $back = 'https://www.vse-nevestam.ru/contacts.html';
// if (isset ($_GET['back'])) {$back = $_GET['back'];}
if (isset ($_POST['name'])) {$name = $_POST['name'];}
if (isset ($_POST['phone'])) {$phone = $_POST['phone'];}
// if (isset ($_POST['email'])) {$email = $_POST['email'];}
// if (isset ($_POST['mess'])) {$mess = $_POST['mess'];}
// if (isset ($_POST['check'])) {$check = $_POST['check'];}
echo $name."123";

$message = $name."\r\n".$phone."\r\n";

    mail('lenok2209@yandex.ru', 'Форма обратной связи с Vse-Nevestam.ru', $message,"Content-Type: text/html; charset=UTF-8");
    mail('debugger.i.am@mail.ru', 'Форма обратной связи с Vse-Nevestam.ru', $message,"Content-Type: text/html; charset=UTF-8");
    // header("Refresh:0; url=$back");

?>
</body>
</html>