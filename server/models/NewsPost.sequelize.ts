import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Default, Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Table
export default class NewsPost extends Model<NewsPost> {
    @Field(() => ID)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Field()
    @AllowNull(false)
    @Column(DataType.TEXT)
    public description!: string;

    @Field({ nullable: true })
    @Column(DataType.TEXT)
    public pictureURL?: string;

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
