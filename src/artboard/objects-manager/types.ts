import { ArtboardObject } from "../object";
import { ObjectId, ObjectTypes } from "../object/types";

export type ObjectsById = { [key in ObjectId]?: ArtboardObject };

export type ObjectsByType = { [key in ObjectTypes]?: ArtboardObject[] };

export type ObjectsIdsByType = { [key in ObjectTypes]?: ObjectId[] };
