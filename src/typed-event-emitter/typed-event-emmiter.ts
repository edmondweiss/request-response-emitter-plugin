import { EventEmitter } from "events";
import {
  EventNameListenerMap,
  TypedEventEmitter,
} from "./typed-event-emitter.types";

export const createTypedEventEmitter = <
  T extends EventNameListenerMap
>(): TypedEventEmitter<T> => new EventEmitter() as TypedEventEmitter<T>;
