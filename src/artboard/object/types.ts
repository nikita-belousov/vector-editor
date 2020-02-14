import { ArtboardObject } from "./object";

export type ObjectId = string;

export enum ObjectEvents {
  CreateObject = "CreateObject"
}

export enum ObjectTypes {
  Cursor = "Cursor",
  Path = "Path",
  MouseSelection = "MouseSelection",
  Background = "Background"
}

export type ObjectEventsPayload = {
  type: ObjectTypes;
  object: ArtboardObject;
};
