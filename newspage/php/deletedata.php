<?php
include 'common.php';
$id = $_POST['id'];

$sql = "delete from newsmanage where id = '{$id}'";
if ($conn->query($sql) === TRUE) {
    echo "删除成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
