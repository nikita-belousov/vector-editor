import { Entity } from "../entity";
import { ArtboardObject } from "../object";
import { ObjectsEvents, ObjectTypes } from "../object/types";
import { ObjectsByType } from "./types";
import { RendererEvents } from "../renderer/types";

export class ObjectsManager extends Entity {
  public displayName = "Object Manager";
  public emittingEventsTypes = [RendererEvents.RenderObjects];

  private objects: ArtboardObject[] = [];

  constructor() {
    super();
    this.eventHandlers = {
      [ObjectsEvents.ObjectCreated]: this.registerNewObject.bind(this),
      [ObjectsEvents.ObjectUpdated]: this.updateObject.bind(this)
    };
  }

  public getObjects(): Readonly<ArtboardObject[]> {
    return this.objects;
  }

  public getObjectsByTypes(types: ObjectTypes[]): Readonly<ObjectsByType> {
    return types.reduce<ObjectsByType>((acc, type) => {
      const objects = this.objects.filter(object => object.type === type);

      if (objects.length === 0) {
        return acc;
      } else {
        acc.set(type, objects);
        return acc;
      }
    }, new Map());
  }

  private registerNewObject(object: ArtboardObject) {
    this.objects.push(object);
  }

  private updateObject(updatedObject: ArtboardObject) {
    const objectsToRerender = this.objects.reduce<ArtboardObject[]>(
      (acc, object) => {
        const udpatedObjectRect = updatedObject.getRect();
        const overlaps = object.getRect().overlapsWith(udpatedObjectRect);
        if (overlaps) acc.push(object);

        return acc;
      },
      [updatedObject]
    );

    this.emit(RendererEvents.RenderObjects, objectsToRerender);
  }
}
