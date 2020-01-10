<?php
$data = json_decode(file_get_contents("../json/data.json"), true);

if (!isset($data["streamer"]))
{
    $data["streamer"] = true;
    file_put_contents("../json/data.json", json_encode($data, JSON_PRETTY_PRINT));
    echo 1;
}
else
{
    echo 0;
}
