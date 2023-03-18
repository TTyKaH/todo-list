export interface Loader {
  element: HTMLElement | null;
  frameRate: number;
  rotationalSpeed: number;
  angleBuffer: number;
  timerID: number | null;
}
