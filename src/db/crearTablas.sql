--Creacion de tablas
CREATE TABLE Usuario(
    id_usuario SERIAL NOT NULL,
    rut_usuario VARCHAR(10) NOT NULL,
    nombre_usuario VARCHAR(20) NOT NULL,
    apellido_usuario VARCHAR(20),
    email_usuario VARCHAR(40) UNIQUE,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE Tienda(
    id_tienda SERIAL NOT NULL,
    nombr_tienda VARCHAR(40),
    email_tienda VARCHAR(40) UNIQUE,
    tipo_tejido VARCHAR(20),
    PRIMARY KEY (id_tienda)
);

CREATE TABLE Producto(
    id_producto VARCHAR(10),
    nombre_producto VARCHAR(60),
    stock INT,
    precio INT,
    PRIMARY KEY (id_producto),
    id_tienda INT,
    id_usuario INT
);

--Foreign keys

ALTER TABLE Producto ADD FOREIGN KEY (id_tienda) REFERENCES Tienda(id_tienda);
ALTER TABLE Producto ADD FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

