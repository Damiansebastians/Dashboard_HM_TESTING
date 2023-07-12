const { Room, Booking } = require("./index");

//----------------ROOM-----------------------------------

const room1 = new Room(
  "John Doe",
  [],
  100,
  15
);

describe("Room", () => {
  test("The name is a string", () => {
    expect(typeof room1.name).toBe("string");
  });

  test("The price is a number", () => {
    expect(typeof room1.rate).toBe("number");
  });

  test("Convert to integer, input in cents.", () => {
    const room2 = new Room("Maria Scott", [], 100.4, 10);
    expect(room2.rate).toBe(100);
  });

  describe("Room occupancy percentage...", () => {
    test('The start date is after or equal to the end date', () => {
        const room3 = new Room("Suite", [], 8500, 15);
        expect(room3.occupancyPercentage(new Date("14/11/2022"), new Date("12/11/2022"))).toBeFalsy();
    })

    test('Return 0% occupancy', () => {
        const book01 = new Booking("User", "user@user.com", new Date("10/11/2022"), new Date("13/11/2022"), 5);
        const book02 = new Booking("User", "user@user.com", new Date("16/11/2022"), new Date("19/11/2022"), 5);
        const book03 = new Booking("user", "user@user.com", new Date("22/11/2022"), new Date("23/11/2022"), 5);

        const room4 = new Room("Suite", [book01, book02, book03], 9500, 10);
        expect(room4.occupancyPercentage(new Date("8/10/2022"), new Date("16/10/2022"))).toBe(0);
    })

    test('Return the actual percentage of occupancy', () => {
        const book01 = new Booking("user", "user@user.com", new Date("10/11/2022"), new Date("13/11/2022"), 10);
        const book02 = new Booking("user", "user@user.com", new Date("16/11/2022"), new Date("19/11/2022"), 10);
        const book03 = new Booking("user", "user@user.com", new Date("22/11/2022"), new Date("23/11/2022"), 10);

        const room5 = new Room("Double", [book01, book02, book03], 8500, 5);
        expect(room5.occupancyPercentage(new Date("8/11/2022"), new Date("24/11/2022"))).toBeGreaterThanOrEqual(1);
    })

    test('Return that is 100% occupied', () => {
        const book01 = new Booking("user", "user@user.com", new Date("10/11/2022"), new Date("13/11/2022"), 15);
        const book02 = new Booking("user", "user@user.com", new Date("16/11/2022"), new Date("19/11/2022"), 15);
        const book03 = new Booking("user", "user@user.com", new Date("22/11/2022"), new Date("23/11/2022"), 15);

        const room6 = new Room("Single", [book01, book02, book03], 5500, 0);
        expect(room6.occupancyPercentage(new Date("10/11/2022"), new Date("13/11/2022"))).toBe(100);
    })

    test("Checkin is type Date", () => {
      const book1 = new Booking("user", "user@user.com", new Date("13/11/2022"));
      expect(typeof(book1.checkIn)).toBe("new Date");
    });
})
});

//---------------------------------------------------


describe('Room occupancy?', () => {
  test('Return that the room is available', () => {
      const book04 = new Booking("user", "user@user.com", new Date("10/11/2022"), new Date("13/11/2022"), 45);
      const book05 = new Booking("user", "user@user.com", new Date("16/11/2022"), new Date("19/11/2022"), 45);
      const book06 = new Booking("user", "user@user.com", new Date("22/11/2022"), new Date("23/11/2022"), 45);

      const room1 = new Room("Suite", [book04, book05, book06], 3450, 25);
      expect(room1.isOccupied(new Date("9/11/2022"))).toBeFalsy;
  })

  test('Return that the room is occupied', () => {
      const book04 = new Booking("user", "user@user.com", new Date("10/11/2022"), new Date("13/11/2022"), 45);
      const book05 = new Booking("user", "user@user.com", new Date("16/11/2022"), new Date("19/11/2022"), 45);
      const book06 = new Booking("user", "user@user.com", new Date("22/11/2022"), new Date("23/11/2022"), 45);

      const room2 = new Room("Double", [book04, book05, book06], 3500, 35);
      expect(room2.isOccupied(new Date("18/11/2022"))).toBeTrusty;
  })
})


//-------------------------------------------------
test("getFee, 10% discount", () => {
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
test("getFee, 20% discount", () => {
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
  test("The discount is applied correctly when calculating the total price", () => {
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