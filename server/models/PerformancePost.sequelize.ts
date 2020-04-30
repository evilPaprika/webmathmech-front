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
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { IsNumber, IsPositive, Max } from 'class-validator';
import { PerformancePostState } from './EnumModels';


@InputType('RatingInput')
@ObjectType()
export class Rating {
    @Field(() => Int)
    @IsNumber()
    @IsPositive()
    @Max(10)
    interest: number = 0;

    @Field(() => Int)
    @IsNumber()
    @IsPositive()
    @Max(10)
    format: number = 0;

    @Field(() => Int)
    @IsNumber()
    @IsPositive()
    @Max(10)
    content: number = 0;
}

@ObjectType()
@Table
export default class PerformancePost extends Model<PerformancePost> {
    @Field(() => ID)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Field({ description: 'News post content' })
    @AllowNull(false)
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

    @Field(() => Rating)
    @AllowNull(false)
    @Column(DataType.JSON)
    public rating!: Rating;

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
