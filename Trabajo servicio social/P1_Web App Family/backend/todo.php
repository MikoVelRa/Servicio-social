<?php

include_once 'ITodoMethods.php';
include 'consultas.php';

class TODO implements ITodoMethods{
    private $id;
    private $nombre;
    private $descripcion;
    private $categoria;
    private $fecha_limite;
    private $estado;

    public function __construct($nombre, $descripcion, $categoria, $fecha_limite, $estado)
    {
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->categoria = $categoria;
        $this->fecha_limite = $fecha_limite;
        $this->estado = $estado;
    }

    public function __get($property)
    {
        return $this->$property;
    }

    public function __set($property, $value)
    {
        $this->$property = $value;
    }

    /** Métodos de interfaz */

    function guardarTodo()
    {
        //Send data to database
        $todo = array(
            'nombre' => $this->nombre, 
            'descripcion' => $this->descripcion,
            'categoria' => $this->categoria,
            'fecha_limite' => $this->fecha_limite,
            'estado' => $this->estado
        );
        addTodo($todo);        
        
        $lastTodo = getLastTodo();
        
        //prototipo de nuevo json
            $todo = array(
                "id" => $lastTodo['id'],
                "tarea" => array(
                    "nombre" => $lastTodo['nombre'],
                    "descripcion" => $lastTodo['descripcion'],
                ),
                "categoria" => $lastTodo['categoria'],
                "fecha_limite" => $lastTodo['fecha_limite'],
                "estado" => $lastTodo['estado']
            );
        
        $arrayJson = json_decode(file_get_contents("../api/todos.json"), true);
        array_push($arrayJson, $todo);

        //sobrescritura de todos.json
        $archivo = fopen('../api/todos.json', 'w');
        fwrite($archivo, json_encode($arrayJson, JSON_UNESCAPED_UNICODE));
        fclose($archivo);
        return true;
    }
    
    static function obtenerTodo($id)
    {
        
    }
    
    static function obtenerTodos()
    {
        return file_get_contents("../api/todos.json");
    }

    
    function actualizarTodo($id){}

    static function eliminarTodo($id)
    {
        deleteTodo($id);
        $array = [];

        foreach(selectTodos() as $tarea){
            $todo = array(
                "id" => $tarea['id'],
                "tarea" => array(
                    "nombre" => $tarea['nombre'],
                    "descripcion" => $tarea['descripcion'],
                ),
                "categoria" => $tarea['categoria'],
                "fecha_limite" => $tarea['fecha_limite'],
                "estado" => $tarea['estado']
            );
            array_push($array, $todo);
        }

        //sobrescritura de todos.json
        $archivo = fopen('../api/todos.json', 'w');
        fwrite($archivo, json_encode($array, JSON_UNESCAPED_UNICODE));
        fclose($archivo);
        return true;
        
        // $contenidoArchivo = file_get_contents("../api/todos.json");
        // $tareas = json_decode($contenidoArchivo, true);
        // return $tareas;
    }
}
