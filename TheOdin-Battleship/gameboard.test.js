import { Gameboard } from './gameboard.js';   
import { Ship } from './ship.js';             

test('sanity', () => expect(1).toBe(1));

test('places ship at coordinates', () => {
  const board = Gameboard();
  const ship = Ship(3);
  expect(board.placeShip(ship, [0, 0], 'horizontal')).toBe(true);

  expect(board.grid[0][0]).toBe(ship);
  expect(board.grid[0][1]).toBe(ship);
  expect(board.grid[0][2]).toBe(ship);
});

test('receiveAttack records missed shot', () => {
  const board = Gameboard();
  board.receiveAttack(5, 5);

  expect(board.missedShots).toContainEqual([5, 5]);
});

test('recieveAttack hits a ship', () => {
  const board = Gameboard();
  const ship = Ship(2);
  board.placeShip(ship, [0, 0], 'horizontal');

  board.receiveAttack(0, 0);

  expect(ship.getHits()).toBe(1);
});

test('reports all ships sunk', () => {
  const board = Gameboard();
  const ship = Ship(1);
  board.placeShip(ship, [0, 0], 'horizonyal');

  board.receiveAttack(0, 0);

  expect(board.areAllShipsSunk()).toBe(true);
});
