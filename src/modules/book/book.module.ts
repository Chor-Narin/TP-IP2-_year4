import { Module } from '@nestjs/common';
import { BookingResolver } from './book.resolver';

@Module({
  providers: [BookingResolver],
})
export class BookingModule {}