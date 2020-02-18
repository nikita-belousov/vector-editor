export enum MouseEvents {
  MouseDown = "MouseDown",
  MouseUp = "MouseUp",
  MouseMove = "MouseMove",
  MouseLeave = "MouseLeave"
}

export enum MouseButtons {
  Left = "Left",
  Right = "Right",
  Middle = "Middle"
}

export interface IMouseCoords {
  mouseX: number;
  mouseY: number;
}

export interface IMouseState {
  coords: IMouseCoords;
  button: MouseButtons | null;
  lastClick: IMouseCoords | null;
}

export type MouseEventPayload = Readonly<IMouseState>;
