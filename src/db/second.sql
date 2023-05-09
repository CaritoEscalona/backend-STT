-- Eliminar tablas existentes
DROP TABLE IF EXISTS Usuarios CASCADE;
DROP TABLE IF EXISTS Productos CASCADE;
DROP TABLE IF EXISTS Tiendas CASCADE;

-- Crear todas las tablas
CREATE TABLE IF NOT EXISTS Permiso (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Rol (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Usuario (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    rut INT,
    correo VARCHAR(255),
    pass VARCHAR(255),
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES Rol(id)
);

CREATE TABLE IF NOT EXISTS Carrito (
    id INT PRIMARY KEY,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS Pago (
    id INT PRIMARY KEY,
    total DECIMAL(10, 2),
    fecha DATE,
    id_carrito INT,
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id)
);

CREATE TABLE IF NOT EXISTS Categoria (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Tienda (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    correo VARCHAR(255),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS Producto (
    id INT PRIMARY KEY,
    sku VARCHAR(255),
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    stock INT,
    precio DECIMAL(10, 2),
    id_categoria INT,
    id_tienda INT,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id),
    FOREIGN KEY (id_tienda) REFERENCES Tienda(id)
);

CREATE TABLE IF NOT EXISTS Red_Social (
    id INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Rol_Permiso (
    id_rol INT,
    id_permiso INT,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES Rol(id),
    FOREIGN KEY (id_permiso) REFERENCES Permiso(id)
);

CREATE TABLE IF NOT EXISTS Carrito_Producto (
    id_carrito INT,
    id_producto INT,
    PRIMARY KEY (id_carrito, id_producto),
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id),
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

CREATE TABLE IF NOT EXISTS Tienda_Red_Social (
    id_tienda INT,
    id_red_social INT,
    enlace_perfil VARCHAR(255),
    PRIMARY KEY (id_tienda, id_red_social),
    FOREIGN KEY (id_tienda) REFERENCES Tienda(id),
    FOREIGN KEY (id_red_social) REFERENCES Red_Social(id)
);
