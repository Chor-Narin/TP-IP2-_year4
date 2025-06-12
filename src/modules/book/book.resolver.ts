import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Booking } from './book.model';

@Resolver(() => Booking)
export class BookingResolver {
  private bookings = [
    {
      id: 1,
      start_date: '2024-01-01',
      end_date: '2024-01-05',
      hotel_id: 1,
      is_checked_in: false,
      price: 200,
    },
    {
      id: 2,
      start_date: '2024-02-10',
      end_date: '2024-02-15',
      hotel_id: 2,
      is_checked_in: true,
      price: 300,
    },
  ];

  @Query(() => [Booking], { name: 'bookings' })
  getAllBookings() {
    return this.bookings;
  }

  @Query(() => Booking, { name: 'booking', nullable: true })
  getBookingById(@Args('id') id: number) {
    return this.bookings.find((booking) => booking.id == id);
  }

  @Query(() => [Booking], { name: 'bookingsByDateRange' })
  getBookingsByDateRange(
    @Args('start_date') start_date: string,
    @Args('end_date') end_date: string,
  ) {
    return this.bookings.filter(
      (booking) =>
        booking.start_date >= start_date && booking.end_date <= end_date,
    );
  }

  @Mutation(() => Booking)
  bookHotel(
    @Args('start_date') start_date: string,
    @Args('end_date') end_date: string,
    @Args('hotel_id') hotel_id: number,
    @Args('price') price: number,
  ) {
    const sortedBookings = this.bookings.sort((a, b) => a.id - b.id);
    const lastId =
      sortedBookings.length > 0 ? sortedBookings[sortedBookings.length - 1].id : 0;
    const newBooking = {
      id: lastId + 1,
      start_date,
      end_date,
      hotel_id,
      is_checked_in: false,
      price,
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  @Mutation(() => Boolean)
  cancelBooking(@Args('id') id: number) {
    try {
      const bookingIndex = this.bookings.findIndex((booking) => booking.id == id);
      if (bookingIndex === -1) {
        return false;
      }
      this.bookings.splice(bookingIndex, 1);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  @Mutation(() => Booking)
  checkIn(@Args('id') id: number) {
    const bookingIndex = this.bookings.findIndex((booking) => booking.id == id);
    if (bookingIndex === -1) {
      throw new Error('Booking not found');
    }
    const updatedBooking = {
      ...this.bookings[bookingIndex],
      is_checked_in: true,
    };
    this.bookings[bookingIndex] = updatedBooking;
    return updatedBooking;
  }
}