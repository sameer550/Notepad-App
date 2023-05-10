class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class unauthorizedError extends HttpError {}
export class conflictError extends HttpError {}
