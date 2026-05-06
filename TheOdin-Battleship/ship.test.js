import { Ship } from './ship.js';

test('sanity', () => expect(1 + 1).toBe(2));

describe('Ship factory', () => {

  test('creates with given length and functions are functions :D', () => {
    const s = Ship(3);
    expect(s.length).toBe(3);
    expect(typeof s.hit).toBe('function');
    expect(typeof s.getHits).toBe('function');
    expect(typeof s.isSunk).toBe('function');
  })

  test('ship is created with correct length', () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
  })

  test('hit increments until length, then sunks', () => {
    const s = Ship(3);
    s.hit(); s.hit(); s.hit(); s.hit();
    expect(s.getHits()).toBe(3);
    expect(s.isSunk()).toBe(true);
  });

  test('length=1 sinks after one hit', () => {
    const s = Ship(1);
    s.hit();
    expect(s.isSunk()).toBe(true);
  });

});

