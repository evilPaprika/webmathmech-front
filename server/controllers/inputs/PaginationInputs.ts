import { Field, InputType, Int } from 'type-graphql';
import { OrderItem } from 'sequelize';


const maxDate = new Date(8640000000000000);

@InputType()
export class OffsetPaginationInputs {
    @Field(() => Int)
    public limit: number = 10;

    @Field(() => Int)
    public offset!: number;

    @Field(() => [String])
    public order: OrderItem = ['createdAt', 'DESC'];
}

@InputType()
export class CursorPaginationInputs {
    @Field(() => Int)
    public limit: number = 10;

    @Field()
    public dateTimeCursor: Date = maxDate;
}
