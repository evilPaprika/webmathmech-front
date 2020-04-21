import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';
import { PerformancePostState } from './EnumModels';

@ObjectType()
@Table
export default class PerformancePost extends Model<PerformancePost> {
    @Field(() => ID)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Field({ description: 'News post content' })
    @Column(DataType.TEXT)
    public text!: string;

    @Field({ nullable: true })
    @Column(DataType.TEXT)
    public pictureURL?: string;

    @Field({ nullable: true })
    @Column(DataType.TEXT)
    public videoURL?: string;

    @Field(() => PerformancePostState)
    @AllowNull(false)
    @Column
    public state!: PerformancePostState;

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
