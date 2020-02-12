export enum Instruments {
  Select = "Select",
  PenTool = "PenTool",
  Shape = "Shape"
}

export enum InstrumentsEvents {
  SetInstrument = "SetInstrument"
}

export type InstrumentsEventPayload = Instruments;
