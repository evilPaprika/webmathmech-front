import { GraphQLJSONObject } from 'graphql-type-json';
import { OrderItem, WhereOptions } from 'sequelize';
import { ArgsType, Field, InputType, Int } from 'type-graphql';


const maxDate = new Date(8640000000000000);


@InputType()
export class OffsetPaginationInputs {
    @Field(() => Int)
    public limit: number = 10;

    @Field(() => Int)
    public offset: number = 0;

    @Field(() => [String])
    public order: OrderItem = ['createdAt', 'DESC'];
}

@ArgsType()
export class CursorPaginationInputs {
    @Field(() => Int)
    public limit: number = 10;

    @Field()
    public dateTimeCursor: Date = maxDate;

    @Field(() => GraphQLJSONObject, { nullable: true })
    public sequelizeWhere?: WhereOptions;
}
