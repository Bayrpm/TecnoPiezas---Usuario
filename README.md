<span style="color: red"> Guía para Configurar y Levantar el Backend </span>

Esta guía te ayudará a configurar y levantar el backend de tu proyecto en ordenadores nuevos o ya configurados. Asegúrate de seguir estos pasos en orden para tener tu backend funcionando correctamente.

Requisitos Previos:

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

1. Python: Asegúrate de tener Python 3.x instalado en tu ordenador.

2. Virtualenv (Solo si no lo tienes instalado): Si no tienes virtualenv instalado, puedes instalarlo con el siguiente comando:
   
   pip install virtualenv

   Configuración del Entorno Virtual:

1. Creación del Entorno Virtual: Si ya tienes un entorno virtual creado, puedes saltar este paso. Si no, crea un nuevo entorno virtual utilizando el siguiente comando (sustituye 'env' por el nombre que quieras para tu entorno virtual):

   virtualenv -p python3 env

2. Activación del Entorno Virtual: Activa el entorno virtual con el siguiente comando:

   source env/bin/activate   # En sistemas Linux/Mac
   
   env\Scripts\activate      # En sistemas Windows

   El entorno virtual debe estar activo cada vez que trabajes en tu proyecto.

4. Librerías Python (Solo si no las tienes instaladas): Ejecuta este codigo para instalar todo lo que necesitas.

   pip install -r requirements.txt

Iniciar el Backend:

Con el entorno virtual activado, puedes seguir estos pasos para iniciar tu backend:

1. Migraciones Iniciales: Ejecuta las migraciones iniciales de Django para crear la estructura de la base de datos:

   python manage.py migrate

2. Crear un Superusuario: Crea un superusuario para administrar la aplicación. Utiliza las siguientes credenciales predeterminadas:

   - Usuario: admin
   - Email: admin@admin.com
   - Contraseña: admin

   Para crear el superusuario, ejecuta el siguiente comando y sigue las instrucciones:

   python manage.py createsuperuser

3. Iniciar el Servidor: Inicia el servidor de desarrollo de Django con el siguiente comando:

   python manage.py runserver

   El servidor se ejecutará en http://localhost:8000/.

¡Tu backend ahora debería estar funcionando correctamente! Puedes acceder al panel de administración en http://localhost:8000/admin/ utilizando las credenciales del superusuario que creaste.
