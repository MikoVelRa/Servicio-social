<?php

interface ITodoMethods{
    public function guardarTodo();
    public static function obtenerTodos();
    public static function obtenerTodo($id);
    public function actualizarTodo($id);
    public static function eliminarTodo($id);
}