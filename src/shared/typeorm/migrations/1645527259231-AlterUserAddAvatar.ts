import {MigrationInterface, QueryRunner, TableColumn, TableExclusion} from "typeorm";

export class AlterUserAddAvatar1645527259231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users",
            new TableColumn(
                {
                    name: "avatar",
                    type: "varchar",
                    isNullable: true
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar")
    }

}
