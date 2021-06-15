CREATE DATABASE IF NOT EXISTS webappfamily;
USE webappfamily;

CREATE TABLE todos(
    id INT(11) auto_increment primary key NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    fecha_limite date NOT NULL,
    estado VARCHAR(20) NOT NULL
);

SELECT id, nombre, descripcion, categoria, DATE_FORMAT(fecha_limite, "%d/%m/%Y") as fecha_limite, estado from todos
order by id desc limit 1;

SELECT * FROM todos;

DELETE FROM todos WHERE id > 9;