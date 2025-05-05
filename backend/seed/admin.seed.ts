import { PasswordHelper } from '../src/common/helpers/password.helper';

import { User } from '../src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const createAdminUser = async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(User);

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
    type: 'admin',
  });

  await userRepo.save(admin);
  console.log('✅ Admin user created successfully!');
};
