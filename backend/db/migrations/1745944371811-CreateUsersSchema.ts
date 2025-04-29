import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersSchema1745944371811 implements MigrationInterface {
  name = 'CreateUsersSchema1745944371811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "lastname" character varying NOT NULL, "firstname" character varying NOT NULL, "address" character varying, "expertise" character varying, "roles" text, "type" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "student_parents" ("student_id" integer NOT NULL, "parent_id" integer NOT NULL, CONSTRAINT "PK_ad07904dc74a079fb1d7d82825c" PRIMARY KEY ("student_id", "parent_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab5687be754283635fffe3692e" ON "student_parents" ("student_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d4d691ddbc51607ae462b68e16" ON "student_parents" ("parent_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "student_parents" ADD CONSTRAINT "FK_ab5687be754283635fffe3692ee" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_parents" ADD CONSTRAINT "FK_d4d691ddbc51607ae462b68e16c" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student_parents" DROP CONSTRAINT "FK_d4d691ddbc51607ae462b68e16c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_parents" DROP CONSTRAINT "FK_ab5687be754283635fffe3692ee"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d4d691ddbc51607ae462b68e16"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab5687be754283635fffe3692e"`,
    );
    await queryRunner.query(`DROP TABLE "student_parents"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31ef2b4d30675d0c15056b7f6e"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
