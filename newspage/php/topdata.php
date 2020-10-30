<?php
include 'common.php';
$id = $_POST['id'];

$sql =  "update newsmanage set top = 1 WHERE id = '{$id}'";
if ($conn->query($sql) === TRUE) {
    echo "删除成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
