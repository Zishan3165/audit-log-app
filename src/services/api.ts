import { stringify } from 'query-string';

const MethodTypes = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const DefaultHeaders = {
  'Content-Type': 'application/json'
};

async function call(
  method: string,
  url?: RequestInfo,
  params?: Record<string, unknown>,
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>,
  retry = 0,
  sendNoHeader?: boolean
) {
  const options: any = { method };
  if (!sendNoHeader) {
    options.headers = headers || DefaultHeaders;
  }

  retry = Math.max(0, Math.min(Number(retry) || 0, 5));

  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  if (body && method !== MethodTypes.GET) {
    options.body = JSON.stringify(body);
  }

  let response;
  const isTrue = true;
  while (isTrue) {
    try {
      response = await fetch(url as RequestInfo, options);
      const responseData = await response.json();
      const responseCode = response.status;
      return { data: responseData, responseCode };
    } catch (err) {
      if (retry <= 0) throw err;
      retry--;
    }
  }
}

export default {
  get: (...args: any) => call(MethodTypes.GET, ...args),
  post: (...args: any) => call(MethodTypes.POST, ...args),
  put: (...args: any) => call(MethodTypes.PUT, ...args),
  delete: (...args: any) => call(MethodTypes.DELETE, ...args)
};
