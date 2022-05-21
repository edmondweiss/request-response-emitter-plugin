import { EventEmitter } from "events";
class DefaultRequestResponseEmitter extends EventEmitter {
    constructor() {
        super(...arguments);
        this.requestHeaderFilter = (headers) => headers;
        this.responseHeaderFilter = (headers) => headers;
    }
    clearRequestHeaderFilter() {
        this.requestHeaderFilter = (headers) => headers;
    }
    clearResponseHeaderFilter() {
        this.responseHeaderFilter = (headers) => headers;
    }
    setRequestHeaderFilter(filter) {
        this.requestHeaderFilter = filter;
        return this;
    }
    setResponseHeaderFilter(filter) {
        this.responseHeaderFilter = filter;
        return this;
    }
    filterRequestHeaders(headers) {
        return this.requestHeaderFilter(headers);
    }
    filterResponseHeaders(headers) {
        return this.responseHeaderFilter(headers);
    }
}
//# sourceMappingURL=request-response-emitter.js.map