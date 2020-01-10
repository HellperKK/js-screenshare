<?php
$data = json_decode(file_get_contents("../json/data.json"), true);
if (isset($data["frame"])) {
    echo $data["frame"];
}
else
{
    echo 0;
}