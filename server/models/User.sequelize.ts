import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';
import { Role } from './Role';


@ObjectType()
@Table
export default class User extends Model<User> {
    @Field(() => ID)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Field()
    @Column
    public name!: string;

    @Field()
    @Column
    public surname!: string;

    @Field(() => Role)
    @Column
    public role!: Role;

    @Field()
    @Unique
    @Column
    public login!: string;

    @AllowNull
    @Column(DataType.STRING)
    public password!: string | null;

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
