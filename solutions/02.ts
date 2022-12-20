type Mapping<T> = { [key: string]: T };

export default function (data: string) {
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
  let score1 = 0;

  rounds.forEach(round => {
    const [opponent, play] = round.split(' ');
    score1 += scores[play];
    if (play === winner[opponent]) {
      score1 += 6;
    }

    if (play === draw[opponent]) {
      score1 += 3;
    }
  });

  let score2 = 0;

  const loosing: Mapping<string> = {
    A: 'Z',
    B: 'X',
    C: 'Y',
  };

  rounds.forEach(round => {
    const [opponent, result] = round.split(' ');
    let pick: string;
    switch (result) {
    case 'X': // Lose
      pick = loosing[opponent];
      score2 += scores[pick];
      break;
    case 'Y': // Draw
      score2 += 3;
      pick = draw[opponent];
      score2 += scores[pick];
      break;
    case 'Z': // Win
      score2 += 6;
      pick = winner[opponent];
      score2 += scores[pick];
      break;
    }
  });

  return [score1, score2];
}
