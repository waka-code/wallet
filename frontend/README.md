# Virtual Wallet Frontend

Este proyecto es el frontend de la billetera virtual, desarrollado con **React**, **TypeScript** y **Vite**. Permite a los usuarios registrar clientes, recargar billetera, realizar pagos con confirmación por token y consultar el saldo, interactuando con el API Gateway del backend.

## Características

- Registro de clientes
- Recarga de billetera
- Pago con confirmación por token (correo electrónico)
- Consulta de saldo
- Validaciones y manejo de errores
- Interfaz moderna y responsiva

## Estructura del Proyecto

```
src/
├── components/
│   ├── hooks/           # Hooks para operaciones de la billetera
│   ├── ui/              # Componentes de interfaz (Button, Card, Alert, etc.)
│   └── wallet/          # Vistas para cada operación (Registrar, Recargar, Pagar, Consultar)
├── schemas/             # Validaciones de formularios
├── services/            # Comunicación con el API Gateway
├── types/               # Tipos y modelos de datos
├── utils/               # Utilidades y helpers
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## Requisitos

- Node.js >= 16.x
- npm >= 8.x

## Instalación

1. Clona el repositorio y accede a la carpeta del frontend:

   ```powershell
   git clone <URL_DEL_REPOSITORIO>
   cd wallet/frontend
   ```

2. Instala las dependencias:

   ```powershell
   npm install
   ```

## Ejecución

1. Inicia la aplicación en modo desarrollo:

   ```powershell
   npm run dev
   ```

2. Accede a la app en [http://localhost:5173](http://localhost:5173)

## Configuración

- Puedes configurar variables de entorno en el archivo `.env` para definir la URL del API Gateway y otros parámetros.

## Pruebas y Lint

- Para ejecutar el linter y mantener la calidad del código:

   ```powershell
   npm run lint
   ```

## Tecnologías

- React
- TypeScript
- Vite
- ESLint

## Notas

- Asegúrate de que el backend esté corriendo antes de usar el frontend.
- Para pruebas manuales de la API, consulta la colección de Postman incluida en el repositorio.

---
