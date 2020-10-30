<?php
include 'common.php';
$title = $_POST['title'];
$time = $_POST['time'];
$content = $_POST['newscontent'];

$sql = "UPDATE newsdraft set newstitle = '{$title}', date = '{$time}', content = '{$content}'";

if ($conn->query($sql) === TRUE) {
    echo "修改成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();