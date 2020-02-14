import { Entity } from "../entity";
import { BackgroundEvents } from "./types";
import { ArtboardEvents } from "../artboard/types";
import { Background } from "./background";

export class BackgroundManager extends Entity {
  public displayName = "background";
  private background = new Background();

  public eventHandlers = {
    [ArtboardEvents.SetWidth]: this.background.setWidth,
    [ArtboardEvents.SetHeight]: this.background.setHeight,
    [BackgroundEvents.SetColor]: this.handleSetColor.bind(this)
  };

  public getBackground(): Background {
    return this.background;
  }

  private handleSetColor(color: string) {
    this.background.setColor(color);
  }
}
