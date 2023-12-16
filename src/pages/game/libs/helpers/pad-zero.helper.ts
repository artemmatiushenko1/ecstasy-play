const padZero = (n: number) => {
  return n.toString().padStart(2, n < 10 ? '0' : '');
};

export { padZero };
