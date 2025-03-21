<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "PostController.php";
$controller = new PostController($pdo);

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    echo json_encode($controller->getAllPosts());
} elseif ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->createPost($data["title"], $data["content"])) {
        echo json_encode(["message" => "Post created successfully"]);
    } else {
        echo json_encode(["error" => "Failed to create post"]);
    }
} elseif ($method === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["id"]) && $controller->deletePost($data["id"])) {
        echo json_encode(["message" => "Post deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete post"]);
    }
} elseif ($method === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["id"]) && isset($data["title"]) && isset($data["content"]) && $controller->updatePost($data["id"], $data["title"], $data["content"])) {
        echo json_encode(["message" => "Post updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update post"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
