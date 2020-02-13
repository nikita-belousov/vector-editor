import isEmpty from "lodash/isEmpty";
import { AppStore } from "../../ui/store";
import { Entity } from "../entity";
import { Select } from "../select";
import { PenTool } from "../pentool";
import { Mouse } from "../mouse";
import { Keyboard } from "../keyboard";
import { Renderer } from "../renderer";
import { ObjectsManager } from "../objects-manager";
import { Instruments } from "../instruments-panel/types";
import { InstrumentsPanel } from "../instruments-panel";
import { CursorManager } from "../cursor";
import { EventChannel } from "../event-channel";
import { Events, EventCallbacks } from "../event-channel/types";
import { Instrument } from "../instrument";
import { ArtboardObject } from "../object";

export class Artboard {
  private cursorCanvas!: HTMLCanvasElement;
  private cursorCtx!: CanvasRenderingContext2D;
  private selectionCanvas!: HTMLCanvasElement;
  private selectionCtx!: CanvasRenderingContext2D;
  private artboardCanvas!: HTMLCanvasElement;
  private artboardCtx!: CanvasRenderingContext2D;

  private entities!: Entity[];
  private mouse!: Mouse;
  private keyboard!: Keyboard;
  private renderer!: Renderer;
  private instrumentsPanel!: InstrumentsPanel;
  private cursorManager!: CursorManager;
  private eventChannel!: EventChannel;
  private objectsManager!: ObjectsManager;
  private instruments: Map<Instruments, Instrument> = new Map();

  constructor() {
    this.eventChannel = new EventChannel();
  }

  public init() {
    const { instruments } = this;

    this.initContexts();

    this.mouse = new Mouse(this.cursorCanvas);
    this.keyboard = new Keyboard(this.artboardCanvas);
    this.instrumentsPanel = new InstrumentsPanel();
    this.cursorManager = new CursorManager();
    this.objectsManager = new ObjectsManager();

    const select = new Select();
    const pentool = new PenTool();

    instruments.set(Instruments.Select, select);
    instruments.set(Instruments.PenTool, pentool);

    this.renderer = new Renderer({
      screenWidth: this.artboardCanvas.width,
      screenHeight: this.artboardCanvas.height,
      cursorCtx: this.cursorCtx,
      selectionCtx: this.selectionCtx,
      artboardCtx: this.artboardCtx,
      cursor: this.cursorManager.getCursor(),
      mouseSelection: select.getMouseSelection(),
      objects: Object.keys(instruments).reduce<ArtboardObject[]>(
        (acc, type) => {
          const instrument = instruments.get(type as Instruments);
          acc.concat((instrument as Instrument).getObjects());
          return acc;
        },
        []
      )
    });

    this.entities = [
      this.mouse,
      this.keyboard,
      this.renderer,
      this.instrumentsPanel,
      this.cursorManager,
      this.objectsManager,
      select,
      pentool
    ];

    this.initEvents();
  }

  public patchStore(store: AppStore) {
    return this.eventChannel.patchStore(store);
  }

  private initContexts() {
    const artboardCanvas = window.document.getElementById(
      "artboard"
    ) as HTMLCanvasElement;
    const selectionCanvas = window.document.getElementById(
      "selection"
    ) as HTMLCanvasElement;
    const cursorCanvas = window.document.getElementById(
      "cursor"
    ) as HTMLCanvasElement;

    const artboardCtx = artboardCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const selectionCtx = artboardCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const cursorCtx = cursorCanvas.getContext("2d") as CanvasRenderingContext2D;

    this.artboardCanvas = artboardCanvas;
    this.cursorCanvas = cursorCanvas;

    this.selectionCanvas = selectionCanvas;
    this.selectionCtx = selectionCtx;

    this.artboardCtx = artboardCtx;
    this.cursorCtx = cursorCtx;
  }

  private initEvents() {
    this.entities.forEach(entity => {
      if (entity.emittingEventsTypes.length > 0) {
        this.initEventEmitters(entity);
      }
      if (!isEmpty(entity.eventHandlers)) {
        this.initEventHandlers(entity);
      }
    });
  }

  private initEventEmitters(entity: Entity) {
    const eventTypes = entity.emittingEventsTypes;
    const eventEmitters = eventTypes.reduce<EventCallbacks>(
      (acc, eventType) => {
        acc[eventType] = this.eventChannel.getEmitter(eventType);
        return acc;
      },
      {}
    );

    entity.setEventEmitters(eventEmitters);
  }

  private initEventHandlers(entity: Entity) {
    const handlers = entity.eventHandlers;

    Object.keys(handlers).forEach(eventType => {
      const handler = handlers[eventType as Events];

      if (!handler) {
        throw new Error(
          `${
            entity.displayName
          } listed ${eventType} as a handled event but has no handler for it`
        );
      }

      this.eventChannel.registerHandler(eventType as Events, handler);
    });
  }
}
