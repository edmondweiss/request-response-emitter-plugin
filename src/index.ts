import { FastifyPluginAsync } from "fastify";
import {
  RequestResponseEmitterPluginOptions,
  RequestResponseLoggerEvents,
} from "./request-response-emitter.types";
import { createTypedEventEmitter } from "./typed-event-emitter/typed-event-emmiter";

export const RequestResponseEmitterPlugin: FastifyPluginAsync<
  RequestResponseEmitterPluginOptions
> = async (instance, opts) => {
  instance.decorate(
    "requestResponseEmitter",
    createTypedEventEmitter<RequestResponseLoggerEvents>()
  );

  if (opts.requestHeaderFilterFn) {
    instance.requestResponseEmitter.setRequestHeaderFilter(
      opts.requestHeaderFilterFn
    );
  }

  if (opts.responseHeaderFilterFn) {
    instance.requestResponseEmitter.setResponseHeaderFilter(
      opts.responseHeaderFilterFn
    );
  }

  instance.decorateRequest("requestResponseConfig", {});
  instance.decorateReply("requestResponseConfig", {});

  instance.addHook("onRequest", (request, reply, done) => {
    request.requestResponseConfig.requestDate = new Date();
    done();
  });

  instance.addHook("preValidation", (request, reply, done) => {
    instance.requestResponseEmitter.emit("onRequest", {
      date: request.requestResponseConfig.requestDate,
      url: request.url,
      headers:
        request.headers == null
          ? null
          : JSON.stringify(
              instance.requestResponseEmitter.filterRequestHeaders(
                request.headers
              )
            ),
      body: request.body == null ? null : JSON.stringify(request.body),
    });
    done();
  });

  instance.addHook("preSerialization", (request, reply, payload, done) => {
    reply.requestResponseConfig.payload = payload;
    done();
  });

  instance.addHook("onResponse", (request, reply, done) => {
    instance.requestResponseEmitter.emit("onResponse", {
      date: new Date(),
      url: request.url,
      statusCode: reply.statusCode,
      headers:
        reply.headers == null
          ? null
          : JSON.stringify(
              instance.requestResponseEmitter.filterResponseHeaders(
                reply.getHeaders()
              )
            ),
      body:
        reply.requestResponseConfig.payload == null
          ? null
          : JSON.stringify(reply.requestResponseConfig.payload),
    });
    done();
  });
};
