class Booking {
  constructor(id, img, number, guest, orderDate, checkIn, checkOut, specialRequest, roomType, status) {
    this.id = id;
    this.img = img;
    this.number = number;
    this.guest = String(guest);
    this.orderDate = orderDate;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.specialRequest = specialRequest;
    this.roomType = roomType;
    this.status = status;
  }
}


module.exports = { Booking };
