import { createClient } from 'redis';
import { urlRedis } from './urlRedis';

const redisClient = createClient({
  url: urlRedis,
});

redisClient.connect().catch(console.error);

export default redisClient;