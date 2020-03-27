import { Field, InputType, Int } from 'type-graphql';
import { OrderItem } from 'sequelize';

@InputType()
export class PaginationInputs {
    @Field(() => Int)
    public limit: number = 10;

    @Field(() => Int)
    public offset!: number;

    @Field(() => [String])
    public order: OrderItem = ['createdAt', 'DESC'];
}
