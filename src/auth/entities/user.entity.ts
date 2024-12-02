import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: false })
export class User extends Model {
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    fullname: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.TEXT(),
        allowNull: false,
    })
    password: string;
}
