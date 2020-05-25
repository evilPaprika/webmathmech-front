import { ArgsType, Field } from 'type-graphql';
import PollVote from '../../models/PollVote.sequelize';
import { Rating } from '../../models/PerformancePost.sequelize';

@ArgsType()
export class voteInput implements Partial<PollVote> {
    @Field()
    public userId!: string;

    @Field()
    public performanceId!: string;

    @Field(() => Rating)
    public rating!: Rating;
}

@ArgsType()
export class voteCurrentUserInput implements Partial<PollVote> {
    @Field()
    public performanceId!: string;

    @Field(() => Rating)
    public rating!: Rating;
}
