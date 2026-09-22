import { env } from './env.js';
import { app } from './app.js';

app.listen(env.port, () => {
  console.log(`mustang-ball server listening on port ${env.port} (${env.nodeEnv})`);
});
