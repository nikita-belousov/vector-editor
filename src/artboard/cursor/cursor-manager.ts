import { Entity } from "../entity";
import { MouseEvents, MouseEventPayload } from "../mouse/types";
import { Instruments, InstrumentsEvents } from "../instruments-panel/types";
import { RendererEvents } from "../renderer/types";
import { ArtboardEvents } from "../artboard/types";
import { Cursor } from "./cursor";

import selectCursor from "../../assets/images/cursors/select.png";
import pentoolCursor from "../../assets/images/cursors/pentool.png";

export class CursorManager extends Entity {
  static cursorImagesPaths: Map<Instruments, string> = new Map([
    [Instruments.Select, selectCursor],
    [Instruments.Pen, pentoolCursor]
  ]);

  public displayName = "Cursor";
  public emittingEventsTypes = [
    RendererEvents.RenderCursor,
    RendererEvents.ClearCursor
  ];
  public cursor: Cursor;
  public cursorImages: Map<Instruments, CanvasImageSource> = new Map();
  public visible = false;

  constructor() {
    super();

    this.eventHandlers = {
      [MouseEvents.MouseMove]: this.handleMouseMove.bind(this),
      [InstrumentsEvents.SetInstrument]: this.handleInstrumentChange.bind(this),
      [ArtboardEvents.EnterArtboard]: this.handleEnterArtboard.bind(this),
      [ArtboardEvents.LeaveArtboard]: this.handleLeaveArtboard.bind(this)
    };

    this.cursor = new Cursor(selectCursor);
  }

  public getCursor(): Cursor {
    return this.cursor;
  }

  private handleMouseMove(coords: MouseEventPayload) {
    if (!this.visible) return;

    const {
      coords: { mouseX, mouseY }
    } = coords;

    // TODO: something better
    this.cursor.setCoords({
      x: mouseX > 5 ? mouseX - 5 : mouseX,
      y: mouseY > 5 ? mouseY - 5 : mouseY
    });

    this.emit(RendererEvents.RenderCursor);
  }

  private handleInstrumentChange(instrument: Instruments) {
    this.loadCursorImage(instrument, () => {
      const image = this.cursorImages.get(instrument);
      if (image === undefined) return;
      this.cursor.setImage(image);
    });
  }

  private handleEnterArtboard() {
    this.visible = true;
  }

  private handleLeaveArtboard() {
    this.visible = false;
    this.emit(RendererEvents.ClearCursor);
  }

  private loadCursorImage(instrument: Instruments, onLoad: () => void) {
    const path = CursorManager.cursorImagesPaths.get(instrument);
    if (path === undefined) {
      return;
      // throw new Error(
      //   `cursor image path for instrument ${instrument} is not defined`
      // );
    }

    const self = this;
    const image = new Image();
    image.onload = function() {
      self.cursorImages.set(instrument, this as CanvasImageSource);
      onLoad();
    };
    image.src = path;
  }
}
