import { ArgsType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import PerformancePost from '../../models/PerformancePost.sequelize';
import { PerformancePostState } from '../../models/EnumModels';


@ArgsType()
export class CreatePerformancePostInput implements Partial<PerformancePost> {
    @Field()
    @Length(10, 2500)
    public text!: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public videoURL?: string;

    @Field(() => PerformancePostState, { nullable: true })
    public state?: PerformancePostState;
}
