# Servidor con microservicios

Este servidor realizado con nodejs se encarga de:

- Generar reporte xlsx apartir de una ciudad dada.
- Obtener los datos guardados en el servidor de datos manejando memoria ram.
- Redireccionar la solicitud para guardar los datos (nombre, ciudad, y url de la foto)

## Comenzando 🚀

Para poder iniciar el proyecto se tiene ciertos prerequisitos. 

### Pre-requisitos 📋

Las principales dependencias que se necesitan son nodejs y npm para poder instalar las librerias que utiliza el proyecto como express, axios, etc.

Ejemplo de instalación de nodejs y npm en 
```
sudo apt update
sudo apt install nodejs npm
sudo npm i -g pm2 
```
Puede instalar pm2 para poder lanzar su aplicación.

### Instalación 🔧

Luego de descargar el repositorio, se procede a iniciar el servidor pero primero se instalan las dependencias del mismo
Dentro de la carpeta /server/

```
npm install
```

## Despliegue 📦

El archivo `ecosystem.config.js` debe modificarlo ya que contiene las variables ENV como dirección del servidor de datos para poder consumir la información y del middleware para estar comunicando cualquier error. 

Para poder desplegar el servidor debe tener corriendo el servidor de datos y luego puede iniciar el servidor.

```
pm2 start ecosystem.config.js
```
Luego puede probar su comunicación através de una petición get al servidor.

`http://ip_server:port/last-data`

Asi obtendrá los datos guardados en redis.

## Construido con 🛠️

* [Nodejs](https://nodejs.org/en//) - Framework de javaScript
* [npm](https://www.npmjs.com/) - Gestionador de paquetes

## Autores ✒️

* **Michael Alejandro Muñoz** - *Trabajo general* 
* **Johan Sebastian Martinez** - *Trabajo general* 

