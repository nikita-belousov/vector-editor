import { Entity } from "../entity";
import { KeyboardEvents, Keys, IKeyboardState } from "./types";

export class Keyboard extends Entity {
  static keyCodes: { [key in number]: Keys } = {
    17: Keys.Ctrl,
    18: Keys.Alt,
    32: Keys.Space,
    27: Keys.Esc
  };

  public displayName = "Keyboard";
  public emittingEventsTypes = [
    KeyboardEvents.KeyDown,
    KeyboardEvents.KeyUp,
    KeyboardEvents.KeyPress
  ];

  private canvas!: HTMLCanvasElement;
  private state!: IKeyboardState;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;
    this.initState();
    this.initEvents();
  }

  private initState() {
    this.state = {
      lastPressed: null,
      [Keys.Alt]: false,
      [Keys.Ctrl]: false,
      [Keys.Space]: false,
      [Keys.Esc]: false
    };
  }

  private initEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("keypress", this.handleKeyPress.bind(this));
  }

  private destroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keypress", this.handleKeyPress);
  }

  private handleKeyDown(e: KeyboardEvent) {
    const key = Keyboard.keyCodes[e.which];
    this.state[key] = true;

    const emitter = this.eventEmitters[KeyboardEvents.KeyDown];
    if (emitter) {
      emitter({ key });
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    const key = Keyboard.keyCodes[e.which];
    this.state[key] = false;
    this.state.lastPressed = key;

    const emitter = this.eventEmitters[KeyboardEvents.KeyUp];
    if (emitter) {
      emitter({ key });
    }
  }

  private handleKeyPress(e: KeyboardEvent) {
    const key = Keyboard.keyCodes[e.keyCode];
    this.state.lastPressed = key;

    const emitter = this.eventEmitters[KeyboardEvents.KeyPress];
    if (emitter) {
      emitter({ key });
    }
  }
}
