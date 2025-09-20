import dotenv from 'dotenv';
import { createApp } from './presentation/app';
import { connectToDatabase } from './infrastructure/adapters/database/databaseConnection';

dotenv.config();

const startServer = async () => {
  try {
    await connectToDatabase();
    const app = createApp();
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`
 Database Service running on port ${port}

Health check:
   http://localhost:${port}/health
`);

    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('\n Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n Shutting down gracefully...');
  process.exit(0);
});

startServer();
