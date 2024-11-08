import { TextEncoder, TextDecoder } from 'util';
import fetch, { Headers, Request, Response } from 'node-fetch';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.BroadcastChannel = class {
  constructor(channelName) {
    this.channelName = channelName;
    this.listeners = [];
  }
  postMessage(message) {
    this.listeners.forEach((listener) => listener({ data: message }));
  }
  addEventListener(event, listener) {
    if (event === "message") {
      this.listeners.push(listener);
    }
  }
  removeEventListener(event, listener) {
    if (event === "message") {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  }
  close() {
    this.listeners = [];
  }
};

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;