export class APIError extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }

  toString(): string {
    return `APIError(code=${this.code}): ${this.message}}`;
  }
}