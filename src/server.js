import app from './app.js';
import { authenticate, syncUp } from './config/database/database.js';
import { envs } from './config/enviroments/enviroments.js';

async function main() {
  try {
    await authenticate();
    await syncUp();
  } catch (error) {
    console.error(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
});
