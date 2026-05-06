const { Player } = require('./player.js');
const { Ship } = require('./ship.js');

test('player can attack enemy board and hit a ship', () => {
  const player = Player();
  const enemy = Player();

  const ship = Ship(1);
  enemy.board.placeShip(ship, [0, 0], 'horizontal');

  player.attack(enemy, 0, 0);

  expect(ship.getHits()).toBe(1);
});

test('cannot hit the same spot', () => {
  const player = Player();
  const enemy = Player();

  const ship = Ship();

  const a1 = player.attack(enemy, 0, 0);
  const a2 = player.attack(enemy, 0, 0);

  expect(a1).toBe('miss');
  expect(a2).toBe('repeat');
});
