import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUser1746285427178 implements MigrationInterface {
  name = 'AddPasswordToUser1746285427178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Thêm cột password nhưng cho phép null
    await queryRunner.query(`
      ALTER TABLE "user" ADD "password" character varying
    `);

    // 2. Cập nhật tất cả user hiện tại với password mặc định (ví dụ: '123456')
    await queryRunner.query(`
      UPDATE "user" SET "password" = '123456'
    `);

    // 3. Sau đó mới đặt NOT NULL
    await queryRunner.query(`
      ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "password"
    `);
  }
}
