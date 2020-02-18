import { Entity } from "../entity";
import { BackgroundEvents } from "./types";
import { ArtboardEvents } from "../artboard/types";
import { RendererEvents } from "../renderer/types";
import { Background } from "./background";

export class BackgroundManager extends Entity {
  public displayName = "background";
  public emittingEventsTypes = [RendererEvents.RenderBackground];

  private background = new Background();

  constructor() {
    super();

    this.eventHandlers = {
      [ArtboardEvents.SetWidth]: this.handleSetWidth.bind(this),
      [ArtboardEvents.SetHeight]: this.handleSetHeight.bind(this),
      [BackgroundEvents.SetColor]: this.handleSetColor.bind(this)
    };
  }

  public getBackground(): Background {
    return this.background;
  }

  private handleSetWidth(width: number) {
    this.background.setWidth(width);
    this.emit(RendererEvents.RenderBackground);
  }

  private handleSetHeight(height: number) {
    this.background.setHeight(height);
    this.emit(RendererEvents.RenderBackground);
  }

  private handleSetColor(color: string) {
    this.background.setColor(color);
    this.emit(RendererEvents.RenderBackground);
  }
}
