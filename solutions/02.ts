type Mapping<T> = { [key: string]: T };

export default function (data: string) {
  // A and X is rock, B and Y is paper, C and Z is scissors
  // Winning combinations are A vs Y, B vs Z, C vs X
  // Winning by rock gives you 1 point, paper 2 points, scissors 3 points
  // Drawing gives you 3 points

  const winner: Mapping<string> = {
    A: 'Y',
    B: 'Z',
    C: 'X',
  };

  const draw: Mapping<string> = {
    A: 'X',
    B: 'Y',
    C: 'Z',
  };

  const scores: Mapping<number> = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const rounds = data.trim().split('\n');

  let score = 0;

  rounds.forEach(round => {
    const [opponent, play] = round.split(' ');
    score += scores[play];
    if (play === winner[opponent]) {
      score += 6;
    }

    if (play === draw[opponent]) {
      score += 3;
    }
  });

  return [score, 0];
}
