// Declarar las clases
class Room {
  constructor(name, booking, rate, discount) {
    this.name = name;
    this.booking = booking;
    this.rate = Math.round(rate);
    this.discount = discount;
  }

  //---------------------------------------
  isOccupied(date) {
    let occupied = false

    this.booking.forEach(booking => {
        if (date >= booking.checkIn && 
            date <= booking.checkOut) {
            occupied = true;
        }
    })
    return occupied;
}

//-----------------------------------------------
  occupancyPercentage(startDate, endDate) {
    let differenceDates = Math.abs(startDate.getTime() - endDate.getTime());
    let percentage = 0;
  
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
  

  static totalOccupancyPercentage(rooms, startDate, endDate) {}

  static availableRooms(rooms, startDate, endDate) {}
}
class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  //----------------------------------------
  getFee() {
    let priceTotal = this.room.rate;
    const discountTotal = this.discount + this.room.discount;

    if (discountTotal > 0 && discountTotal < 100) {
      priceTotal = this.room.rate - (discountTotal * this.room.rate) / 100;
    }
    return Math.round(priceTotal);
  }
}

module.exports = { Room, Booking };
