# Gateway Middleware

Este middleware realizado con nodejs se encarga de:

- Consumir un balanceador de carga (Nginx) para hacer la función de Gateway
- Almacenar los errores de los servidores vínculados al balanceador de carga en archivos logs
- Generar reporte xlsx apartir de una ciudad dada.
- Obtener los datos guardados en el servidor de datos manejando memoria ram.
- Redireccionar la solicitud para guardar los datos (nombre, ciudad, y url de la foto)

## Comenzando 🚀

Para poder iniciar el proyecto se tiene ciertos prerequisitos. 

### Pre-requisitos 📋

Primero se debe configurar Nginx con función de balanceador de carga con las direcciones ip correspondientes a los servidores.

Las principales dependencias que se necesitan son nodejs y npm para poder instalar las librerias que utiliza el proyecto como express, axios, winston, etc.

Ejemplo de instalación de nodejs y npm en 
```
sudo apt update
sudo apt install nodejs npm
sudo npm i -g pm2 
```
Puede instalar pm2 para poder lanzar su aplicación.

### Instalación 🔧

Luego de descargar el repositorio, se procede a iniciar el servidor pero primero se instalan las dependencias del mismo
Dentro de la carpeta /middleware/

```
npm install
```

## Despliegue 📦

El archivo `ecosystem.config.js` debe modificarlo ya que contiene las variables ENV como dirección del servidor de imágenes para poder consumir imágenes almacenadas y del balanceador de carga para poder consumir su servicio.

Para poder desplegar el servidor debe tener corriendo el servidor de datos, iniciar el servidor y el servidor de imágenes.

```
pm2 start ecosystem.config.js
```
Luego puede probar su comunicación através de una petición get al servidor.

`http://ip_middleware:port/last-data`

Asi obtendrá los datos en un servidor almacenados en redis.

## Construido con 🛠️

* [Nodejs](https://nodejs.org/en//) - Framework de javaScript
* [npm](https://www.npmjs.com/) - Gestionador de paquetes

## Autores ✒️

* **Michael Alejandro Muñoz** - *Trabajo general* 
* **Johan Sebastian Martinez** - *Trabajo general* 

