<?php
include 'common.php';
$title = $_POST['title'];
$sql = "SELECT * FROM `newsmanage` where newstitle like '%{$title}%'";
$result = $conn->query($sql);
$array=$result->fetch_all();
$json= json_encode($array);  //将数组转换成json对象
echo $json;
$conn->close();