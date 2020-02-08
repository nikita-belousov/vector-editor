import { IMouseCoords, IMouseState, MouseButtons, MouseEvents } from "./types";
import { EmittingEvents } from "../decorators";
import { Entity } from "../entity";

interface IMouseContstructorParams {
  canvas: HTMLCanvasElement;
}

@EmittingEvents([
  MouseEvents.MouseDown,
  MouseEvents.MouseUp,
  MouseEvents.MouseMove
])
export class Mouse extends Entity {
  public displayName = "Mouse";
  private canvas!: HTMLCanvasElement;
  private state!: IMouseState;

  constructor({ canvas }: IMouseContstructorParams) {
    super();

    this.canvas = canvas;
    this.initState();
    this.initEvents();
  }

  public initState() {
    this.state = {
      coords: { mouseX: 0, mouseY: 0 },
      button: null
    };
  }

  public initEvents() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  public destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }

  public getMouseState(): Readonly<IMouseState> {
    return this.state;
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.state.coords = this.getRelativeCoords(e);
    this.updateMouseButton(e);

    const emitter = this.eventEmitters[MouseEvents.MouseDown];
    const state = this.getMouseState();
    if (emitter) {
      emitter(state);
    }
  };

  private handleMouseUp = (e: MouseEvent) => {
    this.state.coords = this.getRelativeCoords(e);
    this.state.button = null;

    const emitter = this.eventEmitters[MouseEvents.MouseUp];
    const state = this.getMouseState();
    if (emitter) {
      emitter(state);
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    this.state.coords = this.getRelativeCoords(e);

    const emitter = this.eventEmitters[MouseEvents.MouseMove];
    const state = this.getMouseState();
    if (emitter) {
      emitter(state);
    }
  };

  private updateMouseButton(e: MouseEvent) {
    const { state } = this;

    switch (e.button) {
      case 0:
        state.button = MouseButtons.Left;
        break;
      case 1:
        state.button = MouseButtons.Middle;
        break;
      case 2:
        state.button = MouseButtons.Right;
        break;
      default:
        state.button = null;
    }
  }

  private getRelativeCoords(e: MouseEvent): IMouseCoords {
    return {
      mouseX: e.pageX - this.canvas.offsetLeft,
      mouseY: e.pageY - this.canvas.offsetTop
    };
  }
}
