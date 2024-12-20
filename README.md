# Directorio de Personas del Condominio

## Descripción
Este proyecto es una aplicación para gestionar un directorio de personas en un condominio. La aplicación permite registrar la información de las personas que residen en el condominio y asignarlas a la propiedad donde residen. Permite la visualización y adición de registros de momento.

Se utiliza infinite scrolling para el despliegue del directorio de las propiedades, se utiliza clean architecture para definir las capas de la aplicación. Se busca la mejora de la UX con suaves interfaces y elementos de carga que determinan el estado de la aplicación

## Funcionalidades
- Registrar información personal de los residentes (nombre, RUT, teléfono, etc.).
- Asignar personas a unidades o casas dentro del condominio.
- Ver la lista de residentes por unidad.
- Editar y actualizar la información de los residentes (Próximamente).
- Eliminar registros de personas(Próximamente).

## Instalación

### Requisitos previos
- Node.js y npm instalados en tu máquina.
- PostgreSQL en tu máquina o una base de datos PostgreSQL remota.

### Pasos para la instalación

1. Clona el repositorio en tu máquina:
2. Instala las dependencias localmente: npm run dev
3. Crea un archivo .env y coloca la variable de entorno de la BD: DATABASE_URL
4. ejecuta las migraciones con db:generate + db:migrate
5. Los usuarios son generados mediante el archivo data.json. Debe generarse en la carpeta bd/seed/data.json con los datos de los usuarios que usarán la aplicación. La estructura esta subida con un data-example.json
6. correr el comando db:seed para crear los usuarios. **Si ejecutas pw:generate ejecutas en consola una funcion que genera password aleatorias**
7. Listo
