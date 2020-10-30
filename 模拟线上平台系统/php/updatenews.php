<?php
include 'common.php';
$id = $_POST['id'];

$title = $_POST['title'];
$time = $_POST['time'];
$content = $_POST['newscontent'];

$sql = "UPDATE newsmanage set newstitle = '{$title}', date = '{$time}', content = '{$content}'
WHERE id = '{$id}'";

if ($conn->query($sql) === TRUE) {
    echo "修改成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();