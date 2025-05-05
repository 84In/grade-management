import dataSource from '../ormconfig';
import { createAdminUser } from './admin.seed';

const runSeed = async () => {
  await dataSource.initialize();
  await createAdminUser(dataSource);
  await dataSource.destroy();
};

runSeed().catch((err) => {
  console.error('❌ Seeding error:', err);
});
