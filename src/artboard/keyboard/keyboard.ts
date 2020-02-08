import { Entity } from "../entity";
import { EmittingEvents } from "../decorators";
import { KeyboardEvents, Keys, IKeyboardState } from "./types";

interface IKeyboardParams {
  canvas: HTMLCanvasElement;
}

@EmittingEvents([
  KeyboardEvents.KeyDown,
  KeyboardEvents.KeyUp,
  KeyboardEvents.KeyPress
])
export class Keyboard extends Entity {
  static keyCodes: { [key in number]: Keys } = {
    17: Keys.Ctrl,
    18: Keys.Alt,
    32: Keys.Space
  };

  public displayName = "Keyboard";
  private canvas!: HTMLCanvasElement;
  private state!: IKeyboardState;

  constructor({ canvas }: IKeyboardParams) {
    super();

    this.canvas = canvas;
    this.initState();
    this.initEvents();
  }

  private initState() {
    this.state = {
      [Keys.Alt]: false,
      [Keys.Ctrl]: false,
      [Keys.Space]: false
    };
  }

  private initEvents() {
    this.canvas.addEventListener("keydown", this.handleKeyDown);
    this.canvas.addEventListener("keyup", this.handleKeyUp);
    this.canvas.addEventListener("keypress", this.handleKeyPress);
  }

  private destroy() {
    this.canvas.removeEventListener("keydown", this.handleKeyDown);
    this.canvas.removeEventListener("keyup", this.handleKeyUp);
    this.canvas.removeEventListener("keypress", this.handleKeyPress);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const key = Keyboard.keyCodes[e.which];
    this.updateState(key, true);

    const emitter = this.eventEmitters[KeyboardEvents.KeyDown];
    if (emitter) {
      emitter({ key });
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    const key = Keyboard.keyCodes[e.which];
    this.updateState(key, true);

    const emitter = this.eventEmitters[KeyboardEvents.KeyUp];
    if (emitter) {
      emitter({ key });
    }
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    const key = Keyboard.keyCodes[e.which];
    const emitter = this.eventEmitters[KeyboardEvents.KeyPress];
    if (emitter) {
      emitter({ key });
    }
  };

  private updateState(key: Keys, pressed: boolean) {
    this.state[key] = pressed;
  }
}
