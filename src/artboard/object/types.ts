import { ArtboardObject } from "./object";

export type ObjectId = string;

export enum ObjectsEvents {
  ObjectCreated = "CreateObject",
  ObjectUpdated = "ObjectUpdated",
  SetStrokeColor = "SetStrokeColor",
  SetStrokeWidth = "SetStrokeWidth"
}

export enum ObjectTypes {
  Cursor = "Cursor",
  Path = "Path",
  MouseSelection = "MouseSelection",
  Background = "Background"
}

export type ObjectsEventsPayload = {
  type: ObjectTypes;
  object: ArtboardObject;
};
