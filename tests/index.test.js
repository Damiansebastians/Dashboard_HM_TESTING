const { Booking } = require('./index');

const booking = new Booking(
  1,
  'https://randomuser.me/api/portraits/men/1.jpg',
  '#000123456',
  'John Doe',
  'Oct 30th 2020 09:21 AM',
  'Nov 4th, 2020',
  'Nov 9th, 2020',
  'View Notes',
  'Deluxe A - 02',
  'Booked'
);

const booking2 = new Booking(
  1,
  'https://randomuser.me/api/portraits/men/1.jpg',
  '#000123456',
  4,
  'Oct 30th 2020 09:21 AM',
  'Nov 4th, 2020',
  'Nov 9th, 2020',
  'View Notes',
  'Deluxe A - 02',
  'Booked'
);

test('El nombre es un string', () => {
  expect(typeof(booking.guest)).toBe("string");
});

test('El nombre NO es un string', () => {
  expect(typeof(booking2.guest)).toBe("string");
});


test('Fecha de ingreso al hotel es Nov 4th, 2020', () => {
  expect(booking.checkIn).toBe('Nov 4th, 2020');
});


