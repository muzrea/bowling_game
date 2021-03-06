import { calculateTotalScore, Round } from "../main/BowlingGame";
import { cloneDeep } from 'lodash';

describe('bowling scoring rules', () => {
  const initialGame = [];
  for (let i = 0; i < 2; i++) {
    initialGame.push(new Round(1, 4, 0));
    initialGame.push(new Round(3, 5, 0));
    initialGame.push(new Round(4, 4, 0));
    initialGame.push(new Round(2, 3, 0));
    initialGame.push(new Round(1, 4, 0));
  }

  test('should return 300 when calculate total score given ten rounds are all strike', () => {
    const game = [];
    for (let i = 0; i < 9; i++) {
      game.push(new Round(10, 0, 0));
    }
    game.push(new Round(10, 10, 10));

    expect(calculateTotalScore(game)).toBe(300);
  });

  test('should return 62 when calculate total score given ten rounds are [(1,4),(3,5),(4,4),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(1,4)]', () => {
    const game = cloneDeep(initialGame);

    expect(calculateTotalScore(game)).toBe(62);
  });

  test('should return 70 when calculate total score given ten rounds are [(4,6),(3,5),(4,4),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(1,4)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(4, 6);

    expect(calculateTotalScore(game)).toBe(70);
  });

  test('should return 75 when calculate total score given ten rounds are [(10,0),(3,5),(4,4),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(1,4)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(10, 0);

    expect(calculateTotalScore(game)).toBe(75);
  });

  test('should return 91 when calculate total score given ten rounds are [(10,0),(10,0),(4,4),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(1,4)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(10, 0);
    game[1] = new Round(10, 0);

    expect(calculateTotalScore(game)).toBe(91);
  });

  test('should return 79 when calculate total score given ten rounds have both strike and spare such as [(10,0),(3,5),(4,6),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(1,4)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(10, 0);
    game[2] = new Round(4, 6);

    expect(calculateTotalScore(game)).toBe(79);
  });

  test('should return 79 when calculate total score given ten rounds are all spare such as [(1,9),(2,8),(6,4),(1,9),(2,8),(6,4),(1,9),(2,8),(6,4),(3,7,10)]', () => {
    const game = [];
    for (let i = 0; i < 3; i++) {
      game.push(new Round(1, 9, 0));
      game.push(new Round(2, 8, 0));
      game.push(new Round(6, 4, 0));
    }
    game.push(new Round(3, 7, 10));

    expect(calculateTotalScore(game)).toBe(139);
  });

  test('should return 76 when calculate total score given last round is strike such as [(1,4),(3,5),(4,4),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(10,4,5)]', () => {
    const game = cloneDeep(initialGame);
    game[9] = new Round(10,4, 5);

    expect(calculateTotalScore(game)).toBe(76);
  });

  test('should return 72 when calculate total score given ten rounds and the last round is spare such as [(1,4),(3,5),(4,4),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(6,4,5)]', () => {
    const game = cloneDeep(initialGame);
    game[9] = new Round(6,4, 5);

    expect(calculateTotalScore(game)).toBe(72);
  });

  test('should return 76 when calculate total score given ten rounds and have both strike and spare and the last round is spare such as [(10,0),(3,5),(4,6),(2,3),(1,4),(1,4),(3,5),(4,4),(2,3),(6,4,5)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(10,0, 0);
    game[2] = new Round(4,6, 0);
    game[9] = new Round(6,4, 5);

    expect(calculateTotalScore(game)).toBe(89);
  });

  test('should return 112 when calculate total score given ten rounds and have both strike and spare and the last round is strike such as [(10,0),(3,5),(4,6),(2,3),(1,4),(1,4),(3,5),(4,4),(10,0),(10,4,5)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(10,0, 0);
    game[2] = new Round(4,6, 0);
    game[8] = new Round(10,0, 0);
    game[9] = new Round(10,4, 5);

    expect(calculateTotalScore(game)).toBe(112);
  });

  test('should return 134 when calculate total score given ten rounds and have both strike and spare and the last round is strike such as [(10,0),(3,5),(4,6),(2,3),(1,4),(1,4),(3,5),(10,0),(10,0),(10,4,5)]', () => {
    const game = cloneDeep(initialGame);
    game[0] = new Round(10,0, 0);
    game[2] = new Round(4,6, 0);
    game[7] = new Round(10,0, 0);
    game[8] = new Round(10,0, 0);
    game[9] = new Round(10,4, 5);

    expect(calculateTotalScore(game)).toBe(134);
  });
});
