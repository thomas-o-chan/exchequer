/** Formats the given millisecond number into a HH:MM:SS format string */
export function getHMS(ms: number): string {
  const hrs = getDisplayHours(ms);
  const mins = getDisplayMins(ms);
  const secs = getDisplaySecs(ms);
  return `${getTwoDigit(hrs)}:${getTwoDigit(mins)}:${getTwoDigit(secs)}`;
}
function getTwoDigit(num: number): string {
  return num.toString().padStart(2, "0");
}
/** Returns the residual number of seconds in the given millisecond number, between 0 and 59 */
function getDisplaySecs(ms: number): number {
  return Math.floor((ms / 1000) % 60);
}
/** Returns the residual number of mins in the given millisecond number, between 0 and 59 */
function getDisplayMins(ms: number): number {
  return Math.floor((ms / (60 * 1000)) % 60);
}
/** Returns the number of hours in the given millisecond number */
function getDisplayHours(ms: number): number {
  return Math.floor(ms / (60 * 60 * 1000));
}
