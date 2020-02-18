import { IMouseCoords, IMouseState, MouseButtons, MouseEvents } from "./types";
import { Entity } from "../entity";

export class Mouse extends Entity {
  public displayName = "Mouse";
  public emittingEventsTypes = [
    MouseEvents.MouseDown,
    MouseEvents.MouseUp,
    MouseEvents.MouseMove
  ];

  private canvas!: HTMLCanvasElement;
  private state!: IMouseState;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;
    this.initState();
    this.initEvents();
  }

  public initState() {
    this.state = {
      coords: { mouseX: 0, mouseY: 0 },
      button: null,
      lastClick: null
    };
  }

  public initEvents() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
  }

  public destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseleave", this.handleMouseLeave);
  }

  private handleMouseDown = (e: MouseEvent) => {
    const coords = this.getRelativeCoords(e);
    this.state.coords = coords;
    this.state.lastClick = coords;
    this.updateMouseButton(e);

    const emitter = this.eventEmitters[MouseEvents.MouseDown];
    if (emitter) {
      emitter(this.state);
    }
  };

  private handleMouseUp = (e: MouseEvent) => {
    this.state.coords = this.getRelativeCoords(e);

    const emitter = this.eventEmitters[MouseEvents.MouseUp];
    if (emitter) {
      emitter(this.state);
    }

    this.state.button = null;
  };

  private handleMouseMove = (e: MouseEvent) => {
    this.state.coords = this.getRelativeCoords(e);

    const emitter = this.eventEmitters[MouseEvents.MouseMove];
    if (emitter) {
      emitter(this.state);
    }
  };

  private handleMouseLeave = (e: MouseEvent) => {
    this.state.coords = this.getRelativeCoords(e);

    const emitter = this.eventEmitters[MouseEvents.MouseLeave];
    if (emitter) {
      emitter(this.state);
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
    const { canvas } = this;
    const { left, top } = canvas.getBoundingClientRect();

    return {
      mouseX: e.pageX - left - canvas.offsetLeft,
      mouseY: e.pageY - top - canvas.offsetTop
    };
  }
}
