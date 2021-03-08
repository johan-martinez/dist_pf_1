# Sistema distribuido para una aplicación móvil

El presente proyecto se encarga de representar un sistema distribuido, con el fin de generar proyectos independientes con sus funciones específicas, los cuales son:

- **Middleware**: Se encarga de recibir las peticiones del cliente (nombre, ciudad, imagen), pero para esto primero envía la imagen al servidor de imágenes y luego de su confirmación redirecciona los datos a un servidor para que este se encargue de guardar el registro, el servidor correspondiente se obtiene gracias a NGINX que se esta utilizando como balanceador de carga.

- **img_server**: Se encarga de recibir una imagen y guardarla en disco, devuelve la dirección para poder encontrar la misma.

- **server**: Se encarga de consumir el servidor de datos para poder generar las respectivas tareas como los reportes o guardar registros.

- **data_server**: Se encarga de administrar y manejar los datos a través de un sistema de base de datos como mongo y redis. Redis es utilizado para el reporte especifico de cantidad de registros por ciudad, para una mayor rápidez.

A continuación se presentará un breve diagrama para entender los niveles y la jerarquía de los proyectos presentados.


