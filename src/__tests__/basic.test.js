
import Game from '../js/app';

test('randomNumber', () => {

  const result = Game.randomNumber();
    
  expect(result).toBeLessThanOrEqual(Game.FIELD_SIZE);
});

