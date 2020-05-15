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
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import { IsPositive, Max } from 'class-validator';
import { PerformancePostState } from './EnumModels';


@InputType('RatingInput')
@ObjectType()
export class Rating {
    @Field(() => Float)
    @IsPositive()
    @Max(10)
    interest: number = 0;

    @Field(() => Float)
    @IsPositive()
    @Max(10)
    format: number = 0;

    @Field(() => Float)
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
    public description!: string;

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
    public averageRating!: Rating;

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
