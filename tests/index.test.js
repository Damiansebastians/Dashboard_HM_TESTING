const { Room, Booking } = require("./index");

//----------------ROOM-----------------------------------

describe("Room", () => {
  test("The name is a string", () => {
    const room1 = new Room("John Doe", [], 100, 15);
    expect(typeof room1.name).toBe("string");
  });
  
  test("The price is a number", () => {
    const room1 = new Room("John Doe", [], 100, 15);
    expect(typeof room1.rate).toBe("number");
  });

  test("Convert to integer, input in cents.", () => {
    const room2 = new Room("Maria Scott", [], 100.4, 10);
    expect(room2.rate).toBe(100);
  });

  describe("Room occupancy percentage...", () => {
    test('The start date is after or equal to the end date', () => {
        const room3 = new Room("Suite", [], 8500, 15);
        expect(room3.occupancyPercentage(new Date("05/07/2023"), new Date("04/07/2023"))).toBeFalsy();
    })

    test('Return 0% occupancy', () => {
        const book01 = new Booking("User", "user@user.com", new Date("01/07/2023"), new Date("05/07/2023"), 5);
        const book02 = new Booking("User", "user@user.com", new Date("06/07/2023"), new Date("10/07/2023"), 5);
        const book03 = new Booking("user", "user@user.com", new Date("11/07/2023"), new Date("15/07/2023"), 5);

        const room4 = new Room("Suite", [book01, book02, book03], 9500, 10);
        expect(room4.occupancyPercentage(new Date("16/08/2023"), new Date("20/08/2023"))).toBe(0);
    })

    test('Return 50% occupancy', () => {
      const book01 = new Booking("User", "user@user.com", new Date("07/01/2023"), new Date("07/11/2023"), 5);
      const book02 = new Booking("User", "user@user.com", new Date("08/05/2023"), new Date("08/10/2023"), 5);
      const book03 = new Booking("user", "user@user.com", new Date("09/11/2023"), new Date("09/15/2023"), 5);

      const room5 = new Room("Suite", [book01, book02, book03], 9500, 10);
      expect(room5.occupancyPercentage(new Date("07/01/2023"), new Date("07/21/2023"))).toBe(50);
  })

    test('Return the actual percentage of occupancy', () => {
        const book01 = new Booking("user", "user@user.com", new Date("11/10/2022"), new Date("11/13/2022"), 10);
        const book02 = new Booking("user", "user@user.com", new Date("11/16/2022"), new Date("11/19/2022"), 10);
        const book03 = new Booking("user", "user@user.com", new Date("11/22/2022"), new Date("11/23/2022"), 10);

        const room6 = new Room("Double", [book01, book02, book03], 8500, 5);
        expect(room6.occupancyPercentage(new Date("11/8/2022"), new Date("11/24/2022"))).toBeGreaterThanOrEqual(1);
    })

    test('Return that is 100% occupied', () => {
        const book01 = new Booking("user", "user@user.com", new Date("11/10/2022"), new Date("11/13/2022"), 15);
        const book02 = new Booking("user", "user@user.com", new Date("11/16/2022"), new Date("11/19/2022"), 15);
        const book03 = new Booking("user", "user@user.com", new Date("11/22/2022"), new Date("11/23/2022"), 15);

        const room7 = new Room("Single", [book01, book02, book03], 5500, 0);
        expect(room7.occupancyPercentage(new Date("11/10/2022"), new Date("11/13/2022"))).toBe(100);
    })

    test("Checkin is type Date", () => {
      const book1 = new Booking("user", "user@user.com", new Date("11/13/2022"));
      expect(book1.checkIn instanceof Date).toBeTruthy();
    });
  });
});

//---------------------------------------------------


describe('Room occupancy?', () => {
  test('Return that the room is available', () => {
      const book04 = new Booking("user", "user@user.com", new Date("11/10/2022"), new Date("11/13/2022"), 45);
      const book05 = new Booking("user", "user@user.com", new Date("11/16/2022"), new Date("11/19/2022"), 45);
      const book06 = new Booking("user", "user@user.com", new Date("11/22/2022"), new Date("11/23/2022"), 45);

      const room1 = new Room("Suite", [book04, book05, book06], 3450, 25);
      expect(room1.isOccupied(new Date("11/9/2022"))).toBeFalsy;
  })

  test('Return that the room is occupied', () => {
      const book04 = new Booking("user", "user@user.com", new Date("11/10/2022"), new Date("11/13/2022"), 45);
      const book05 = new Booking("user", "user@user.com", new Date("11/16/2022"), new Date("11/19/2022"), 45);
      const book06 = new Booking("user", "user@user.com", new Date("11/22/2022"), new Date("11/23/2022"), 45);

      const room2 = new Room("Double", [book04, book05, book06], 3500, 35);
      expect(room2.isOccupied(new Date("11/18/2022"))).toBeTruthy();
  })
})


//-------------------------------------------------
test("getFee, 5% discount room + 5% discount booking", () => {
  const room1 = new Room(
    "single", [], 500, 5);

  const book1 = new Booking(
    "user",
    "user@user.com",
    new Date("2023-07-07"),
    new Date("2023-07-15"),
    5,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(451);
});

//--------------------------------------------------
test("getFee, 10% discount room + 10% discount booking", () => {
  const room1 = new Room("suite", [], 300, 10);
  const book1 = new Booking(
    "user",
    "user@user.com",
    new Date("2023-07-07"),
    new Date("2023-07-15"),
    10,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(243);
});

//--------------------------------------------------
test("getFee, 10% discount room + 0% discount booking", () => {
  const room1 = new Room("suite", [], 1000, 10);
  const book1 = new Booking(
    "user",
    "user@user.com",
    new Date("2023-07-07"),
    new Date("2023-07-15"),
    0,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(900);
});

//--------------------------------------------------
test("getFee, 0% discount room + 20% discount booking", () => {
  const room1 = new Room("suite", [], 100, 0);
  const book1 = new Booking(
    "user",
    "user@user.com",
    new Date("2023-07-07"),
    new Date("2023-07-15"),
    20,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(80);
});

//--------------------------------------------------
test("getFee, 0% discount room + 0% discount booking", () => {
  const room1 = new Room("suite", [], 200, 0);
  const book1 = new Booking(
    "user",
    "user@user.com",
    new Date("2023-07-07"),
    new Date("2023-07-15"),
    0,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(200);
});

//--------------------------------------------------
test("getFee, 100% discount room + 10% discount booking", () => {
  const room1 = new Room("suite", [], 400, 100);
  const book1 = new Booking(
    "user",
    "user@user.com",
    new Date("2023-07-07"),
    new Date("2023-07-15"),
    10,
    room1
  );

  room1.bookings = [book1];
  expect(book1.getFee()).toBe(0);
});

//---------------------------------------------------
describe('Booking', () => {
  test("The discount is applied correctly when calculating the total price", () => {
    const room = new Room( 
      'Deluxe Room', 
      [], 
      100, 
      10
    );

    const book = new Booking(
      'James Phillips', 
      'user@user.com', 
      new Date("2023-07-01"), 
      new Date("2023-07-05"), 
      10, 
      room
    );

    expect(book.getFee()).toBe(81);
  });
});
