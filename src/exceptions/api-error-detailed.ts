import type { AxiosResponse } from 'axios';

export class APIErrorDetailed extends Error {
  code: number;
  text: string;
  message: string;
  result: any;
  status_code: number;
  response: AxiosResponse<any> | undefined;
  request: any;

  constructor(response: AxiosResponse<any>, text: string) {
    super();
    this.code = 0;
    this.text = text;

    try {
      this.code = response.data.code;
      this.message = response.data.message;
      this.result = response.data.result;
    } catch (error) {
      this.message = `Invalid JSON error message from Bitpin: ${response.data}`;
    }

    this.status_code = response.status;
    this.response = response;
    this.request = response.request;
  }

  toString(): string {
    return `APIError(code=${this.code}): ${this.message} | ${this.result} | ${this.text}`;
  }
}
