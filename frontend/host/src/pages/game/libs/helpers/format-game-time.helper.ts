import { padZero } from './pad-zero.helper.js';

const formatGameTime = (time: number) => {
  const secondsInMinute = 60;
  const minutes = Math.floor(time / secondsInMinute);
  const seconds = Math.floor(time - minutes * secondsInMinute);

  return `${padZero(minutes)}:${padZero(seconds)}`;
};

export { formatGameTime };
