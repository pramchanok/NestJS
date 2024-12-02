import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "customer", timestamps: false })
export class Customer extends Model {
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    fullName: string;

    @Column({
        defaultValue: false,
    })
    isActive: boolean;
}
