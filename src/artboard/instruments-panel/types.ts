export enum InstrumentGroups {
  Move = "Move",
  Slive = "Slice",
  Shape = "Shape",
  Draw = "Draw"
}

export enum Instruments {
  Select = "Select",
  Pen = "Pen",
  Pencil = "Pencil",
  Rectangle = "Rectangle",
  Polygon = "Polygon",
  Ellipse = "Ellipse",
  Star = "Star"
}

export enum InstrumentsEvents {
  SetInstrument = "SetInstrument"
}

export type InstrumentsEventPayload = Instruments;
