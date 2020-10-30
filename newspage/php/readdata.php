<?php
include 'common.php';
$sql = "SELECT * FROM `newsmanage` ORDER BY `top`asc,`id` ASC";
$result = $conn->query($sql);
$array=$result->fetch_all();
$json= json_encode($array);  //将数组转换成json对象
echo $json;
$conn->close();
