import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Book')
export class BookResolver {
  @Query('books')
  getAllBooks() {
    return [
      {
        id: 1,
        title: 'Mathematic',
        author: 'Dara',
        price: 10,
      },
      {
        id: 2,
        title: 'Physic',
        author: 'Sok',
        price: 20,
      },
      {
        id: 3,
        title: 'Chemistry',
        author: 'Ratha',
        price: 15,
      },
    ];
  }
}
