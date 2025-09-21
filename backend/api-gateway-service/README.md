# API Gateway Service

Este servicio actúa como puerta de entrada para todas las solicitudes del sistema, gestionando la comunicación entre el frontend y los microservicios.

## Comandos principales

```powershell
npm install
npm run start
```

## Variables de entorno

Configura el archivo `.env` siguiendo el ejemplo `.env.example`.

## Funcionalidad

- Redirecciona y valida las solicitudes del frontend.
- Maneja la autenticación y autorización (si aplica).
- Orquesta la comunicación entre microservicios.

## Estructura relevante

- `src/presentation/controllers`: Controladores para clientes, pagos y billetera.

---
