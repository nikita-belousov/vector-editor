export enum KeyboardEvents {
  KeyUp = "KeyUp",
  KeyDown = "KeyDown",
  KeyPress = "KeyPress"
}

export enum Keys {
  Ctrl = "Ctrl",
  Alt = "Alt",
  Space = "Space"
}

export type IKeyboardState = { [key in Keys]: boolean };

export type KeyboardEventPayload = {
  key: Keys;
};
