import _ from 'lodash';

const charToNumber = (char: string) =>
  char.charCodeAt(0) > 96 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38;

export function part1(data: string) {
  const sacks = data.trim().split('\n');
  const inBothCompartments = sacks.map(sack => {
    const middle = Math.floor(sack.length / 2);
    const firstCompartment = sack.slice(0, middle);
    const secondCompartment = sack.slice(middle);

    const lettersInBothCompartments = firstCompartment
      .split('')
      .filter(letter => secondCompartment.includes(letter));

    return new Set(lettersInBothCompartments);
  });

  return _.sum(
    inBothCompartments
      .map(set => Array.from(set.values()).map(charToNumber))
      .flat()
  );
}

export function part2(data: string) {
  const sacks = data.trim().split('\n');
  const groups = _.chunk(sacks, 3);

  const badgeSum = groups.map(group => {
    const firstCompartment = group[0].split('');
    const secondCompartment = group[1].split('');
    const thirdCompartment = group[2].split('');

    const lettersInAllCompartments = firstCompartment
      .filter(letter => secondCompartment.includes(letter))
      .filter(letter => thirdCompartment.includes(letter));

    return charToNumber(lettersInAllCompartments[0]);
  });

  return _.sum(badgeSum);
}
