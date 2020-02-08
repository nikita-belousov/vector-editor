export enum Instruments {
  Select = "Select",
  PenTool = "PenTool",
  Shape = "Shape"
}

export enum InstrumentsEvents {
  ChangeInstrument = "ChangeInstrument"
}

export type InstrumentsEventPayload = Instruments;
