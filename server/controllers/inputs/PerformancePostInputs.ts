import { Length, MinLength } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';

import { PerformancePostState } from '../../models/EnumModels';
import PerformancePost from '../../models/PerformancePost.sequelize';


@ArgsType()
export class CreatePerformancePostInput implements Partial<PerformancePost> {
    @Field()
    @Length(3, 30, {
        message: 'Заголовок должен быть длиной от 3 до 30 символов!'
    })
    public title!: string;

    @Field({ nullable: true })
    @Length(10, 2500, {
        message: 'Описание должно быть длиной от 10 до 2500 символов!'
    })
    public description?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public videoURL?: string;

    @Field(() => PerformancePostState, { nullable: true })
    public state?: PerformancePostState;

    @Field()
    @MinLength(1, {
        message: 'Обязательное поле "Спикер" не заполнено!'
    })
    public speakerId!: string;
}

@ArgsType()
export class PatchPerformancePostInputs implements Partial<PerformancePost> {
    @Field()
    public id!: string;

    @Field({ nullable: true })
    @Length(3, 30, {
        message: 'Заголовок должен быть длиной от 3 до 30 символов!'
    })
    public title?: string;

    @Field({ nullable: true })
    @Length(10, 2500, {
        message: 'Описание должно быть длиной от 10 до 2500 символов!'
    })
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
    @MinLength(1, {
        message: 'Обязательное поле "Спикер" не заполнено!'
    })
    public speakerId?: string;
}

@InputType()
export class PerformancePaginationFiltersInput {
    @Field(() => [PerformancePostState], { nullable: true })
    public states?: PerformancePostState[];
}
