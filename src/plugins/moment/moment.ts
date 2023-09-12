import Big, {RoundingMode} from 'big.js';
import { Moment } from 'moment-timezone';

export interface TimeComponent {
  hours: number;
  minutes: number;
  seconds: number;
}

export function secondsToTimeComponents(
  value: number, enableHours: boolean = true, enableMinutes: boolean = true, enableSeconds: boolean = true): TimeComponent {

  const bigValue = Big(value);
  const hours = !enableHours ? 0 : Number(bigValue.div(60 * 60).round(0, Big.roundDown));
  const minutes = !enableMinutes ? 0 : Number(bigValue.minus(hours * 60 * 60).div(60).round(0, Big.roundDown));
  const seconds = !enableSeconds ? 0 : Number(bigValue.minus(hours * 60 * 60 + minutes * 60));

  return {
    hours,
    minutes,
    seconds,
  };
}

export function formattedTime(timeComponents: TimeComponent): string {
  return `${String(timeComponents.hours).padStart(2, '0')}:`
    + `${String(timeComponents.minutes).padStart(2, '0')}:`
    + `${String(timeComponents.seconds).padStart(2, '0')}`;
}

export function toApiISO(value: Moment): string {
  return value.toISOString().split('.').shift() + 'Z';
}
