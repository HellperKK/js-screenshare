<?php
if (isset($_POST["frame"])) {
    $frame = $_POST["frame"];
    $data = json_decode(file_get_contents("../json/data.json"), true);
    $data["frame"] = $frame;
    file_put_contents("../json/data.json", json_encode($data, JSON_PRETTY_PRINT));
    echo 1;
}
else
{
    echo 0;
}