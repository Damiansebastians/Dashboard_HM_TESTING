
class Room {
  name: string;
  booking: Booking[];
  rate: number;
  discount: number;

  constructor(name: string, booking: Booking[], rate: number, discount: number) {
    this.name = name;
    this.booking = booking;
    this.rate = Math.round(rate);
    this.discount = discount;
  }

  //---------------------------------------
  isOccupied(date: Date) {
    let occupied: boolean = false

    this.booking.forEach(booking => {
        if (date >= booking.checkIn && 
            date <= booking.checkOut) {
            occupied = true;
        }
    })
    return occupied;
}
//-----------------------------------------------
  occupancyPercentage(startDate: Date, endDate: Date): number | false {
    let differenceDates = Math.abs(startDate.getTime() - endDate.getTime());
    let percentage: number = 0;
  
    if (startDate.getTime() >= endDate.getTime()) {
      return 0;
    }
  
    this.booking.forEach((booking) => {
      if (
        booking.checkIn.getTime() >= startDate.getTime() &&
        booking.checkOut.getTime() <= endDate.getTime()
      ) {
        percentage += Math.abs(
          booking.checkIn.getTime() - booking.checkOut.getTime()
        );
      }
    });
  
    if (percentage === 0) {
      return 0;
    } else {
      return Number(((percentage * 100) / differenceDates).toFixed(0));
    }
  }
  

  static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number{
    let totalOccupiedDays = 0;
    let totalDays = 0;

    rooms.forEach((room) => {
      const startTimestamp = startDate.getTime();
      const endTimestamp = endDate.getTime();

      for (
        let currentTimestamp = startTimestamp;
        currentTimestamp <= endTimestamp;
        currentTimestamp += 86400000
      ) {
        const currentDate = new Date(currentTimestamp);
        totalDays++;

        if (room.isOccupied(currentDate)) {
          totalOccupiedDays++;
        }
      }
    });

    return (totalOccupiedDays / totalDays) * 100;
  }

  static availableRooms(rooms: Room[], startDate: Date, endDate: Date): Room[] {
    const availableRooms: Room[] = [];

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      let isOccupied = false;

      const startTimestamp = startDate.getTime();
      const endTimestamp = endDate.getTime();

      for (
        let currentTimestamp = startTimestamp;
        currentTimestamp <= endTimestamp;
        currentTimestamp += 86400000
      ) {
        const currentDate = new Date(currentTimestamp);
        if (room.isOccupied(currentDate)) {
          isOccupied = true;
          break;
        }
      }

      if (!isOccupied) {
        availableRooms.push(room);
      }
    }

    return availableRooms;
  }
}


class Booking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: {rate: number ,discount: number };

  constructor(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: {rate: number ,discount: number }) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  //----------------------------------------
  getFee(): number {
    let priceTotal: number = this.room.rate;
    const discountRoom: number = this.room.discount;
    const discountBooking: number = this.discount; 
  
    if (discountRoom > 0 && discountRoom <= 100) {
      const discountAmountRoom = (discountRoom * this.room.rate) / 100;
      priceTotal -= discountAmountRoom;
    }
  
    if (discountBooking > 0 && discountBooking < 100) {
      const discountAmountBooking = (discountBooking * priceTotal) / 100;
      priceTotal -= discountAmountBooking;
    }
  
    return Math.round(priceTotal);
  }
}
module.exports = { Room, Booking };
