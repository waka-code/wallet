# Virtual Wallet

> ⚠️ **IMPORTANTE**  
> Si deseas probar la funcionalidad de envío de correos, deberás crear una cuenta gratuita en [Resend](https://resend.com), generar una API Key y actualizar el valor de `API_KEY` en el archivo `.env` ubicado en `backend/database-service`.  
> Ten en cuenta que la versión gratuita solo permite enviar correos a tu propia dirección, mientras que la versión paga permite enviarlos a cualquier destinatario.  
> **Sin este paso, la funcionalidad de envío de correos no estará disponible.**

> **Pasos esenciales para ejecutar el proyecto localmente:**
>
> 1. Instala las dependencias:
>    ```powershell
>    npm install
>    ```
> 2. Compila el proyecto:
>    ```powershell
>    npm run build
>    ```
> 3. Inicia la aplicación:
>    ```powershell
>    npm run start
>    ```
>    Es fundamental seguir estos pasos para que el proyecto se levante correctamente en tu entorno local.
>
> **No necesitas configurar una base de datos propia:**  
> El proyecto ya utiliza una instancia de MongoDB Atlas, por lo que puedes ejecutar y probar la aplicación sin realizar configuraciones adicionales de base de datos.

Virtual Wallet es una solución de billetera virtual que permite la gestión de clientes, pagos y recargas, implementada bajo una arquitectura de microservicios y con frontend desarrollado en React.

## Estructura del Proyecto

```
wallet/
├── backend/
│   ├── api-gateway-service/
│   └── database-service/
├── shared/
├── frontend/
└── postman/
```

- **backend/api-gateway-service**: Puerta de entrada para las solicitudes, gestiona la comunicación entre el frontend y los microservicios.
- **backend/database-service**: Microservicio encargado de las operaciones de base de datos (clientes, pagos, recargas, balance).
- **shared**: Código compartido (tipos, middlewares).
- **frontend**: Aplicación web desarrollada en React.
- **postman**: Colecciones y ambientes para pruebas de API.

## Requisitos

- Node.js >= 16.x
- npm >= 8.x

## Instalación

1. Clona el repositorio:

   ```powershell
   git clone <URL_DEL_REPOSITORIO>
   cd wallet
   ```

2. Instala las dependencias:

   Desde la raíz del proyecto puedes instalar todas las dependencias ejecutando:

   ```powershell
   npm install
   ```

   Si prefieres instalar manualmente en cada paquete, ejecuta:

   ```powershell
   cd backend/api-gateway-service; npm install
   cd ../database-service; npm install
   cd ../../shared; npm install
   cd ../../frontend; npm install
   ```

3. Configura los archivos `.env` en cada servicio utilizando los ejemplos `.env.example`.

## Ejecución

### Backend

1. Inicia el microservicio de base de datos:

   ```powershell
   cd backend/database-service
   npm run dev
   ```

2. Inicia el API Gateway:

   ```powershell
   cd ../api-gateway-service
   npm run dev
   ```

### Frontend

1. Inicia la aplicación React:

   ```powershell
   cd frontend
   npm run dev
   ```

2. Accede a la aplicación en [http://localhost:5173](http://localhost:5173) (puerto por defecto de Vite).

## Pruebas de API

- Utiliza los archivos de la carpeta `postman/` para importar las colecciones y ambientes en Postman.

## Estructura de Carpetas

- **backend/api-gateway-service/src/presentation/controllers**: Controladores para clientes, pagos y billetera.
- **backend/database-service/src/application/useCases**: Casos de uso para operaciones principales.
- **frontend/src/components/wallet**: Componentes React para cada operación de la billetera.

## Tecnologías

- Node.js, Express, TypeScript
- React, Vite
- Postman (pruebas manuales)

---

## Variables de Entorno

Cada microservicio requiere su propio archivo `.env`. Usa los archivos `.env.example` como referencia.

---
