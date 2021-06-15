<?php

include('todo.php');

$peticion = $_SERVER['REQUEST_METHOD'];
$data = file_get_contents('php://input');

header("Content-Type: application/json; charset=UTF-8");

switch ($peticion) {
    case "GET":
        if (isset($_GET['id_param'])) {
            print_r($_GET['id_param']);
        } else{
            echo Todo::obtenerTodos();
        }
        break;

    case "POST":
        $_POST = json_decode($data, true);
        $todo = new TODO($_POST['tarea']['nombre'], $_POST['tarea']['descripcion'], $_POST['categoria'], $_POST['fecha_limite'], $_POST['estado']);
        $todo->guardarTodo();

        if($todo) {
            echo Todo::obtenerTodos();
        }
        break;

    case "PUT":
        $_PUT = json_decode($data, true);
        echo "Param: " . $_GET['id_param'] . PHP_EOL;
        echo "Teléfono: " . $_PUT['phone'] . PHP_EOL;
        break;

    case "DELETE":
        TODO::eliminarTodo($_GET['id']);        
        echo Todo::obtenerTodos();
        break;
    }
