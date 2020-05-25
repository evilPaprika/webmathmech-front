import {
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import { IsPositive, Max } from 'class-validator';

import { PerformancePostState } from './EnumModels';
// https://github.com/RobinBuschmann/sequelize-typescript/issues/454#issuecomment-420903400
// eslint-disable-next-line import/no-cycle
import User from './User.sequelize';


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

    @Field()
    @AllowNull(false)
    @Column(DataType.TEXT)
    public title!: string;

    @Field({ nullable: true })
    @AllowNull
    @Column(DataType.TEXT)
    public description?: string;

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
    @Column(DataType.JSON)
    public averageRating: Rating = new Rating();

    @Field(() => ID, { nullable: true })
    @ForeignKey(() => User)
    @AllowNull(true)
    @Column(DataType.UUID)
    speakerId?: string;

    @Field(() => User, { nullable: true })
    @BelongsTo(() => User)
    speaker?: User;

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
