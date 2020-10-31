<?php
$page = $_POST['page'];
$start_form = ($page-1) * 3;
include 'common.php';
$sql = "SELECT * FROM `newsmanage` ORDER BY `top`asc,`id` ASC limit $start_form,3";
$result = $conn->query($sql);
$array=$result->fetch_all();
$json= json_encode($array);  //将数组转换成json对象
echo $json;
$conn->close();