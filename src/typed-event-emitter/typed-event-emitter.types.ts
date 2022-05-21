export type EventNameListenerMap = {
  [key: string]: (...args: any[]) => void;
};

export interface TypedEventEmitter<EventMap extends EventNameListenerMap> {
  addListener<E extends keyof EventMap>(
    eventName: E,
    listener: EventMap[E]
  ): this;

  on<E extends keyof EventMap>(eventName: E, listener: EventMap[E]): this;

  once<E extends keyof EventMap>(eventName: E, listener: EventMap[E]): this;

  removeListener<E extends keyof EventMap>(
    eventName: E,
    listener: EventMap[E]
  ): this;

  off<E extends keyof EventMap>(eventName: E, listener: EventMap[E]): this;

  removeAllListeners<E extends keyof EventMap>(event?: E): this;

  setMaxListeners(n: number): this;

  getMaxListeners(): number;

  listeners<E extends keyof EventMap>(eventName: E): EventMap[E][];

  rawListeners<E extends keyof EventMap>(eventName: E): EventMap[E][];

  emit<E extends keyof EventMap>(
    eventName: E,
    ...args: Parameters<EventMap[E]>
  ): boolean;

  listenerCount<E extends keyof EventMap>(eventName: E): number;

  prependListener<E extends keyof EventMap>(
    eventName: E,
    listener: EventMap[E]
  ): this;

  prependOnceListener<E extends keyof EventMap>(
    eventName: E,
    listener: EventMap[E]
  ): this;

  eventNames<E extends keyof EventMap>(): Array<keyof EventMap>;
}
