import dotenv from 'dotenv';
import { createApp } from './presentation/app';

dotenv.config();

const startServer = async () => {
  try {
    const app = createApp();
    const port = process.env.PORT;
    
    app.listen(port, () => {
      console.log(`API Gateway Service running on port ${port}`);
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
