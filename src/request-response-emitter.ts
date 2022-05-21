import { EventEmitter } from "events";
import { TypedEventEmitter } from "./typed-event-emitter/typed-event-emitter.types";
import {
  FastifyRequestHeaders,
  FastifyResponseHeaders,
  RequestHeaderFilterFn,
  RequestResponseEmitter,
  RequestResponseLoggerEvents,
  ResponseHeaderFilterFn,
} from "./request-response-emitter.types";

class DefaultRequestResponseEmitter
  extends (EventEmitter as new () => TypedEventEmitter<RequestResponseLoggerEvents>)
  implements RequestResponseEmitter
{
  private requestHeaderFilter: RequestHeaderFilterFn = (headers) => headers;
  private responseHeaderFilter: ResponseHeaderFilterFn = (headers) => headers;

  clearRequestHeaderFilter(): void {
    this.requestHeaderFilter = (headers) => headers;
    this.listeners("onResponse");
  }

  clearResponseHeaderFilter(): void {
    this.responseHeaderFilter = (headers) => headers;
  }

  setRequestHeaderFilter(filter: RequestHeaderFilterFn): this {
    this.requestHeaderFilter = filter;
    return this;
  }

  setResponseHeaderFilter(filter: ResponseHeaderFilterFn): this {
    this.responseHeaderFilter = filter;
    return this;
  }

  filterRequestHeaders(headers: FastifyRequestHeaders): FastifyRequestHeaders {
    return this.requestHeaderFilter(headers);
  }

  filterResponseHeaders(
    headers: FastifyResponseHeaders
  ): FastifyResponseHeaders {
    return this.responseHeaderFilter(headers);
  }
}
