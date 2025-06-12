import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Hotel } from './hotel.model';

@Resolver(() => Hotel)
export class HotelResolver {
  private hotels = [
    {
      id: 1,
      name: 'Grand Hotel',
      address: '123 Main St',
      phone: '012345678',
    },
    {
      id: 2,
      name: 'Riverside Resort',
      address: '456 River Rd',
      phone: '098765432',
    },
  ];

  @Query(() => [Hotel], { name: 'hotels' })
  getAllHotels() {
    return this.hotels;
  }

  @Query(() => Hotel, { name: 'hotel', nullable: true })
  getHotelById(@Args('id') id: number) {
    return this.hotels.find((hotel) => hotel.id == id);
  }

  @Mutation(() => Hotel)
  createHotel(
    @Args('name') name: string,
    @Args('address') address: string,
    @Args('phone') phone: string,
  ) {
    const sortedHotels = this.hotels.sort((a, b) => a.id - b.id);
    const lastId =
      sortedHotels.length > 0 ? sortedHotels[sortedHotels.length - 1].id : 0;
    const newHotel = {
      id: lastId + 1,
      name,
      address,
      phone,
    };
    this.hotels.push(newHotel);
    return newHotel;
  }

  @Mutation(() => Hotel)
  updateHotel(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('address', { nullable: true }) address?: string,
    @Args('phone', { nullable: true }) phone?: string,
  ) {
    const hotelIndex = this.hotels.findIndex((hotel) => hotel.id == id);
    if (hotelIndex === -1) {
      throw new Error('Hotel not found');
    }
    const updatedHotel = {
      ...this.hotels[hotelIndex],
      name: name || this.hotels[hotelIndex].name,
      address: address || this.hotels[hotelIndex].address,
      phone: phone || this.hotels[hotelIndex].phone,
    };
    this.hotels[hotelIndex] = updatedHotel;
    return updatedHotel;
  }

  @Mutation(() => Boolean)
  deleteHotel(@Args('id') id: number) {
    try {
      const hotelIndex = this.hotels.findIndex((hotel) => hotel.id == id);
      if (hotelIndex === -1) {
        return false;
      }
      this.hotels.splice(hotelIndex, 1);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
