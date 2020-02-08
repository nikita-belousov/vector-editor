import { Events, IKeyboardState } from "./types";
import { Entity } from "./entity";
import { PenTool } from "./pentool";
import { Mouse } from "./mouse";
import { ObjectsManager } from "./objects-manager";
import { Instrument } from "./instrument";
import { Instruments } from "./instruments-panel/types";
import { Cursor } from "./cursor";
import { EventChannel } from "./event-channel";
import { EventEmitters } from "./event-channel/types";

export class Root {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private entities!: Entity[];
  private mouse!: Mouse;
  private cursor!: Cursor;
  private eventChannel!: EventChannel;
  private instruments!: { [key in Instruments]: Instrument };
  private keyboardState!: IKeyboardState;
  private objectsManager!: ObjectsManager;
  private activeInstrument!: Instruments;

  public init() {
    this.initContext();
    this.initMouse();
    this.initCursor();
    this.initEventChannel();
    this.initInstruments();
    this.initEvents();
    this.initObjectsManager();
  }

  public draw() {
    this.drawBackground();
    this.drawObjects();
    this.drawCursor();
  }

  private initContext() {
    const canvas = window.document.getElementById(
      "artboard"
    ) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error("can't find canvas element");
    }
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) {
      throw new Error("can't get 2d context from canvas");
    }

    this.canvas = canvas;
    this.ctx = ctx;
  }

  private initMouse() {
    this.mouse = new Mouse({ canvas: this.canvas });
    this.entities.push(this.mouse);
  }

  private initCursor() {
    this.cursor = new Cursor();
    this.cursor.init();
    this.entities.push(this.cursor);
  }

  private initEventChannel() {
    this.eventChannel = new EventChannel();
  }

  private initObjectsManager() {
    this.objectsManager = new ObjectsManager(this.canvas);
  }

  private initInstruments() {
    const { instruments, objectsManager } = this;

    const penTool = (instruments[Instruments.PenTool] = new PenTool({
      instrument: Instruments.PenTool,
      getObjects: objectsManager.getObjectsByTypes,
      onObjectAdd: objectsManager.addNewObject,
      onObjectUpdate: objectsManager.updateObject
    }));

    this.entities.push(penTool);
  }

  private initEvents() {
    this.entities.forEach(entity => {
      if (entity.emittingEvents) {
        this.initEventEmitter(entity);
      }
      if (entity.handlingEvents) {
        this.initEventListener(entity);
      }
    });
  }

  private initEventEmitter(entity: Entity) {
    const eventTypes = entity.emittingEventsTypes;
    const eventEmitters = eventTypes.reduce<EventEmitters>((acc, eventType) => {
      acc[eventType] = this.eventChannel.getEmitter(eventType);
      return acc;
    }, {});

    entity.setEventEmitters(eventEmitters);
  }

  private initEventListener(entity: Entity) {
    const events = entity.handlingEventsTypes;
    const handlers = entity.eventHandlers;

    events.forEach(eventType => {
      const handler = handlers[eventType as Events];
      if (!handler) {
        throw new Error(
          `${
            entity.displayName
          } listed ${eventType} as a handled event but has no handler for it`
        );
      }

      this.eventChannel.registerListener(eventType as Events, handler);
    });
  }

  private drawBackground() {
    const { canvas, ctx } = this;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private drawCursor() {
    this.cursor.draw(this.ctx);
  }

  private drawObjects() {
    const { instruments } = this;

    Object.keys(instruments).forEach(instrumentName => {
      const instrument = instruments[instrumentName as Instruments];
      instrument.render(this.ctx);
    });
  }

  private pickInstrument = () => {
    const instrument = this.instruments[this.activeInstrument];
    instrument.handlePick();
  };
}
