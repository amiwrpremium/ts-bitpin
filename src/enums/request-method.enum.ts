export const RequestMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
} as const;

export type RequestMethod = (typeof RequestMethod)[keyof typeof RequestMethod];
