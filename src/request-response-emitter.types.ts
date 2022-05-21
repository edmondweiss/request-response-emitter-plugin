import { FastifyReply } from "fastify/types/reply";
import { TypedEventEmitter } from "./typed-event-emitter/typed-event-emitter.types";
import { IncomingHttpHeaders } from "http";

export type LoggableRequest = {
  date: Date;
  url: string;
  headers: string | null;
  body: string | null;
};

export type LoggableResponse = {
  date: Date;
  url: string;
  statusCode: number;
  headers: string | null;
  body: string | null;
};

export type RequestResponseLoggerEvents = {
  onRequest: (request: LoggableRequest) => void;
  onResponse: (response: LoggableResponse) => void;
};

export type FastifyRequestHeaders = IncomingHttpHeaders;

export type FastifyResponseHeaders = ReturnType<FastifyReply["getHeaders"]>;

export type RequestHeaderFilterFn = (
  headers: FastifyRequestHeaders
) => FastifyRequestHeaders;

export type ResponseHeaderFilterFn = (
  headers: FastifyResponseHeaders
) => FastifyResponseHeaders;

export interface RequestResponseEmitter
  extends TypedEventEmitter<RequestResponseLoggerEvents> {
  clearRequestHeaderFilter(): void;

  clearResponseHeaderFilter(): void;

  setRequestHeaderFilter(filter: RequestHeaderFilterFn): this;

  setResponseHeaderFilter(filter: ResponseHeaderFilterFn): this;

  filterRequestHeaders(headers: FastifyRequestHeaders): FastifyRequestHeaders;

  filterResponseHeaders(
    response: FastifyResponseHeaders
  ): FastifyResponseHeaders;
}

export type RequestResponseEmitterPluginOptions = {
  requestHeaderFilterFn?: RequestHeaderFilterFn;
  responseHeaderFilterFn?: ResponseHeaderFilterFn;
};

declare module "fastify" {
  interface FastifyInstance {
    requestResponseEmitter: RequestResponseEmitter;
  }

  interface FastifyRequest {
    requestResponseConfig: {
      requestDate: Date;
    };
  }

  interface FastifyReply {
    requestResponseConfig: {
      payload: unknown;
    };
  }
}
