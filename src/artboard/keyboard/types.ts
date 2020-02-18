export enum KeyboardEvents {
  KeyUp = "KeyUp",
  KeyDown = "KeyDown",
  KeyPress = "KeyPress"
}

export enum Keys {
  Ctrl = "Ctrl",
  Alt = "Alt",
  Space = "Space",
  Esc = "Esc"
}

export type IKeyboardState = { [key in Keys]: boolean } & {
  lastPressed: Keys | null;
};

export type KeyboardEventPayload = {
  key: Keys;
};
