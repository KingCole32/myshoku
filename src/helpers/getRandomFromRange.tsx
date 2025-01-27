// return a random number from a range, inclusive
function getRandomFromRange(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export default getRandomFromRange