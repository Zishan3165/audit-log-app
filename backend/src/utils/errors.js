export class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

export class AlreadyExists extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'AlreadyExists';
  }
  getCode() {
    return 409;
  }
}

export class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
  }
  getCode() {
    return 400;
  }
}

export class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
  }

  getCode() {
    return 404;
  }
}

export class Unauthorized extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
  getCode() {
    return 401;
  }
}
