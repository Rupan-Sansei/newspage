<?php
include 'common.php';

$title = $_POST['title'];
$time = $_POST['time'];
$content = $_POST['newscontent'];

// echo $title,$time;
// print_r($content);
$sql = "INSERT INTO newsmanage (newstitle, date, content)
    VALUES ('{$title}','{$time}','{$content}')";
     
if ($conn->query($sql) === TRUE) {
    echo '成功';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
