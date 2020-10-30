<?php
include 'common.php';
$id = $_POST['id'];
$sql = "select * from newsmanage where id = '{$id}'";
$result = $conn->query($sql);
$array=$result->fetch_all();
$json= json_encode($array);  //将数组转换成json对象
echo $json;
$conn->close();
