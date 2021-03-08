# Servidor de datos

Este servidor realizado con nodejs se encarga de:

- Abrir conexión con la base de datos, en este caso se utilizó un cluster de mongo en la nube. 
- Manipular la base de datos para poder guardar y obtener todos los registros.
- Tener una base de datos que utiliza memoria ram para más rápidez, la cual es redis.

## Comenzando 🚀

Para poder iniciar el proyecto se tiene ciertos prerequisitos. 

### Pre-requisitos 📋

Las principales dependencias que se necesitan son nodejs, npm, redis y mongodb (opcional) para poder instalar las librerias que utiliza el proyecto como express, axios, etc.

Ejemplo de instalación de nodejs y redis en Debian 10
```
sudo apt update
sudo apt install nodejs npm
sudo apt install redis-server
```
Si quiere dejar redis como un servicio puede documentarse en el siguiente enlace [Redis Instalation](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-debian-9)
y para la instalacion de [mongodb](https://linuxize.com/post/how-to-install-mongodb-on-debian-10/). 

### Instalación 🔧

Luego de descargar el repositorio, se procede a iniciar el servidor de datos pero primero se instalan las dependencias del mismo
Dentro de la carpeta /data_server/

```
npm install
```

## Despliegue 📦

Antes de lanzar la aplicación debe tener en cuenta:

- Modificar el archivo `db/connection.js` y poner la url de su cluster o en su defecto si instaló mongodb la ip y el puerto de lanzamiento. Más información [aquí](https://mongoosejs.com/docs/connections.html)   
- Tener arriba los servicio de redis y mongo (si cambia el puerto de redir modifique el archivo `api_rest.js`)
 
Si genera una petición GET  a la url  `http://ip_server_data:port/db?city=TUNJA` obtendrá los registro de la ciudad de TUNJA en formato JSON.
 
## Construido con 🛠️

* [Nodejs](https://nodejs.org/en//) - Framework de javaScript
* [npm](https://www.npmjs.com/) - Gestionador de paquetes
* [MongoDB](https://www.mongodb.com/es) - Sistema de base de datos NoSQL
* [Redis](https://redis.io/) -  Motor de base de datos en memoria

## Autores ✒️

* **Michael Alejandro Muñoz** - *Trabajo general* 
* **Johan Sebastian Martinez** - *Trabajo general* 
