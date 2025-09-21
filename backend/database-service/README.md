# Database Service

Microservicio encargado de las operaciones de base de datos: clientes, pagos, recargas y balance.

## Comandos principales

```powershell
npm install
npm run start
```

## Variables de entorno

Configura el archivo `.env` siguiendo el ejemplo `.env.example`.  
Incluye la variable `API_KEY` para el envío de correos con Resend.

## Funcionalidad

- CRUD de clientes, pagos y recargas.
- Consulta de balance.
- Envío de correos (ver notas en el README principal).

## Estructura relevante

- `src/application/useCases`: Casos de uso principales.
- `src/domain/entities`: Entidades del dominio.
- `src/infrastructure/repositories`: Acceso a datos.

---
