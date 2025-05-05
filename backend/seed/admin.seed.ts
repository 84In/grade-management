import { Admin } from 'src/users/entities/admin.entity';
import { PasswordHelper } from '../src/common/helpers/password.helper';

import { DataSource } from 'typeorm';

export const createAdminUser = async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(Admin);

  const existing = await userRepo.findOne({ where: { username: 'admin' } });
  if (existing) {
    console.log('ℹ️ Admin user already exists.');
    return;
  }

  const admin = userRepo.create({
    username: 'admin',
    password: await PasswordHelper.hashPassword('admin123'),
    email: 'admin@example.com',
    phone: '0123456789',
    lastname: 'Admin',
    firstname: 'System',
    address: 'N/A',
    type: 'Admin',
  });

  await userRepo.save(admin);
  console.log('✅ Admin user created successfully!');
};
