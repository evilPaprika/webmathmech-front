import { Field, ObjectType } from 'type-graphql';
import {
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from 'sequelize-typescript';
// https://github.com/RobinBuschmann/sequelize-typescript/issues/454#issuecomment-420903400
// eslint-disable-next-line import/no-cycle
import User from './User.sequelize';
// eslint-disable-next-line import/no-cycle
import PerformancePost, { Rating } from './PerformancePost.sequelize';

@ObjectType()
@Table
export default class PollVote extends Model<PollVote> {
    @PrimaryKey
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    public userId!: string;

    @Field(() => User)
    @BelongsTo(() => User)
    public user!: User;

    @PrimaryKey
    @ForeignKey(() => PerformancePost)
    @AllowNull(false)
    @Column(DataType.UUID)
    public performanceId!: string;

    @Field(() => PerformancePost)
    @BelongsTo(() => PerformancePost)
    public performance!: PerformancePost;

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
