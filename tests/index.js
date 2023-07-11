// Declarar las clases
class Room {
  constructor(name, booking, rate, discount) {
    this.name = name;
    this.booking = booking;
    this.rate = Math.round(rate);
    this.discount = discount;
  }

  //---------------------------------------
  isOccuppied(date) {
    let result = false;
  
      if (date >= this.booking.checkIn && 
          date <= this.booking.checkOut) {
        result = true;
      } else {
      result
    }
    return result;
  }

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
