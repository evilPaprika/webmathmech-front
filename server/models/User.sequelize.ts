import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

import { Role } from './EnumModels';
// https://github.com/RobinBuschmann/sequelize-typescript/issues/454#issuecomment-420903400
// eslint-disable-next-line import/no-cycle
import PerformancePost from './PerformancePost.sequelize';
// eslint-disable-next-line import/no-cycle
import PollVote from './PollVote.sequelize';


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
    @AllowNull(false)
    @Column
    public role!: Role;

    @Field()
    @AllowNull(false)
    @Unique
    @Column
    public login!: string;

    @AllowNull
    @Column(DataType.STRING)
    public password!: string | null;

    @Field({ nullable: true })
    @AllowNull
    @Column
    public universityGroup?: string;

    @Field(() => [PerformancePost], { nullable: true })
    @HasMany(() => PerformancePost)
    public performances?: [PerformancePost];

    @Field(() => [PollVote], { nullable: true })
    @HasMany(() => PollVote)
    public pollVotes?: [PollVote];

    @Field()
    @CreatedAt
    public createdAt!: Date;

    @Field()
    @UpdatedAt
    public updatedAt!: Date;
}
