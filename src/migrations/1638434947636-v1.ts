import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class v11638434947636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "farmacia",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "logo",
                    type: "varchar",
                },
                {
                    name: "nome",
                    type: "varchar",
                },
                {
                    name: "cnpj",
                    type: "varchar",
                },
                {
                    name: "endereco",
                    type: "varchar",
                },
                {
                    name: "horarioFuncionamento",
                    type: "varchar",
                },
                {
                    name: "responsavel",
                    type: "varchar",
                },
                {
                    name: "telefone",
                    type: "varchar",
                },
                {
                    name: "outros",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "farmaciaSede",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                }
            ]
        }), true);

        await queryRunner.addColumn("farmaciaSede", new TableColumn({
            name: "idFarmacia",
            type: "int"
        }));

        await queryRunner.createForeignKey("farmaciaSede", new TableForeignKey({
            columnNames: ["idFarmacia"],
            referencedColumnNames: ["id"],
            referencedTableName: "farmacia",
            onDelete: "CASCADE"
        }));


        await queryRunner.createTable(new Table({
            name: "farmaciaFilial",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                }
            ]
        }), true);

        await queryRunner.addColumn("farmaciaFilial", new TableColumn({
            name: "idFarmacia",
            type: "int"
        }));

        await queryRunner.addColumn("farmaciaFilial", new TableColumn({
            name: "idFarmaciaSede",
            type: "int"
        }));
        
        await queryRunner.createForeignKey("farmaciaFilial", new TableForeignKey({
            columnNames: ["idFarmacia"],
            referencedColumnNames: ["id"],
            referencedTableName: "farmacia",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("farmaciaFilial", new TableForeignKey({
            columnNames: ["idFarmaciaSede"],
            referencedColumnNames: ["id"],
            referencedTableName: "farmaciaSede",
            onDelete: "CASCADE"
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const tableFarmaciaFilial = await queryRunner.getTable("farmaciaFilial");
        const foreignKeyFarmacia = tableFarmaciaFilial.foreignKeys.find(fk => fk.columnNames.indexOf("idFarmacia") !== -1);
        await queryRunner.dropForeignKey("farmaciaFilial", foreignKeyFarmacia);
        const foreignKeyFarmaciaSede = tableFarmaciaFilial.foreignKeys.find(fk => fk.columnNames.indexOf("idFarmaciaSede") !== -1);
        await queryRunner.dropForeignKey("farmaciaFilial", foreignKeyFarmaciaSede);
        await queryRunner.dropColumn("farmaciaFilial", "idFarmacia");
        await queryRunner.dropColumn("farmaciaFilial", "idFarmaciaSede");
    
        const tableFarmaciaSede = await queryRunner.getTable("farmaciaSede");
        const foreignKeyFarmaciaSedeFarmacia = tableFarmaciaSede.foreignKeys.find(fk => fk.columnNames.indexOf("idFarmacia") !== -1);
        await queryRunner.dropForeignKey("farmaciaSede", foreignKeyFarmaciaSedeFarmacia);
        await queryRunner.dropColumn("farmaciaSede", "idFarmacia");

        await queryRunner.dropTable("farmaciaFilial");
        await queryRunner.dropTable("farmaciaSede");
        await queryRunner.dropTable("farmacia");

        
    }

}
