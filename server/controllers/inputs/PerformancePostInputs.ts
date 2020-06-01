import { ArgsType, Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import PerformancePost from '../../models/PerformancePost.sequelize';
import { PerformancePostState } from '../../models/EnumModels';


@ArgsType()
export class CreatePerformancePostInput implements Partial<PerformancePost> {
    @Field()
    @Length(3, 30)
    public title!: string;

    @Field({ nullable: true })
    @Length(10, 2500)
    public description?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public videoURL?: string;

    @Field(() => PerformancePostState, { nullable: true })
    public state?: PerformancePostState;

    @Field({ nullable: true })
    public speakerId?: string;
}

@ArgsType()
export class PatchPerformancePostInputs implements Partial<PerformancePost> {
    @Field()
    public id!: string;

    @Field({ nullable: true })
    @Length(3, 30)
    public title?: string;

    @Field({ nullable: true })
    @Length(10, 2500)
    public description?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public videoURL?: string;

    @Field(() => PerformancePostState, { nullable: true })
    public state?: PerformancePostState;

    @Field({ nullable: true })
    public speakerId?: string;
}

@InputType()
export class PerformancePaginationFiltersInput {
    @Field(() => [PerformancePostState], { nullable: true })
    public states?: PerformancePostState[];
}
