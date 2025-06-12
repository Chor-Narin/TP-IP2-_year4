import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => ID)
  id: number;

  @Field()
  start_date: string;

  @Field()
  end_date: string;

  @Field()
  hotel_id: number;

  @Field()
  is_checked_in: boolean;

  @Field()
  price: number;
}