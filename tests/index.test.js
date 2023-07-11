const { Room, Booking } = require("./index");

//----------------ROOM-----------------------------------

const room1 = new Room(
  "John Doe",
  [],
  100,
  15
);

describe("Room", () => {
  test("El nombre es un string", () => {
    expect(typeof room1.name).toBe("string");
  });

  test("El precio es un número entero", () => {
    expect(typeof room1.rate).toBe("number");
  });

  test("Price se convierte a entero si se ingresan centavos", () => {
    const room2 = new Room(
      "Maria Scott",
      [],
      100.4,
      10
    );
    expect(room2.rate).toBe(100);
  });

  test("Fecha de ingreso al hotel es Nov 4th, 2020", () => {
    const book1 = new Booking(
      "user",
      "user@user.com",
      "Nov 4th, 2020"
    );
    expect(book1.checkIn).toBe("Nov 4th, 2020");
  });


});

//---------------------------------------------------

describe("¿La habitación está ocupada?", () => {

  test("Ocupada", () => {
    const book = new Booking(
      "user",
      "user@user.com",
      "2023-07-01",
      "2023-07-15"
    );

    const occupiedRoom = new Room(
      "Deluxe", 
      [book], 
      15000, 
      10
    );

    expect(occupiedRoom.isOccuppied("2023-07-10")).toBeFalsy();
  });

//--------------------------------------------------
  test("No ocupada", () => {
    const book = new Booking(
      "user",
      "user@user.com",
      "2023-07-01",
      "2023-07-15"
    );
    const occupiedRoom = new Room(
      "Double", 
      [book], 
      10000, 
      5
    );

    expect(occupiedRoom.isOccuppied("2023-01-01")).toBeFalsy();
  });
});

//-------------------------------------------------
test("getFee, 10% descuento", () => {
  const room1 = new Room(
    "single", 
    [], 
    250, 
    5
  );

  const book1 = new Booking(
    "user",
    "user@user.com",
    "2023-07-07",
    "2023-07-15",
    5,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(225);
});

//--------------------------------------------------
test("getFee, 20% descuento", () => {
  const room1 = new Room("suite", [], 300, 15);
  const book1 = new Booking(
    "user",
    "user@user.com",
    "2023-07-07",
    "2023-07-15",
    5,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(240);
});

//---------------------------------------------------
describe('Booking', () => {
  test(' Discount se aplica correctamente al calcular el precio total', () => {
    const room = new Room( 
      'Deluxe Room', 
      [], 
      200, 
      5
    );

    const book = new Booking(
      'James Phillips', 
      'user@user.com', 
      '2023-07-01', 
      '2023-07-05', 
      5, 
      room
    );

    expect(book.getFee()).toBe(180);
  });
})