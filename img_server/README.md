# Servidor de imágenes 

Este servidor realizado con nodejs se encarga de:

- Almacenar imágenes en disco.
- Enviar la url por la cuál acceder a la imágen


## Comenzando 🚀

Para poder iniciar el proyecto se tiene ciertos prerequisitos. 

### Pre-requisitos 📋

Las principales dependencias que se necesitan son nodejs y npm para poder instalar las librerias que utiliza el proyecto como express e internal-ip

Ejemplo de instalación de nodejs y npm en 
```
sudo apt update
sudo apt install nodejs npm
sudo npm i -g pm2 
```
Puede instalar pm2 para poder lanzar su aplicación.

### Instalación 🔧

Luego de descargar el repositorio, se procede a iniciar el servidor pero primero se instalan las dependencias del mismo
Dentro de la carpeta /img_server/

```
npm install
```

## Despliegue 📦

Para poder desplegar el servidor de imágenes ejecutar el comando: 

```
pm2 start index.js
```

## Construido con 🛠️

* [Nodejs](https://nodejs.org/en//) - Framework de javaScript
* [npm](https://www.npmjs.com/) - Gestionador de paquetes

## Autores ✒️

* **Michael Alejandro Muñoz** - *Trabajo general* 
* **Johan Sebastian Martinez** - *Trabajo general* 

