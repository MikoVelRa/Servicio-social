<?php

class Conexion{

    public $link = "mysql:host=127.0.0.1:3306;dbname=webappfamily;charset=utf8";
    public $user = "root";
    public $password = "root";

    public function conectar()
    {
        try {
            $conexion = new PDO($this->link, $this->user, $this->password, array(PDO::ATTR_PERSISTENT => true));
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);            
            return $conexion;
        } catch (PDOException $error) {
            echo $error->getMessage();            
            die();
        }
    } 
}

