import { TIMEOUT_SEC } from './config';
import { PosibleForUpload } from './types';

const timeout = function (s: number): Promise<Error> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url: string) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await (res as Response).json();

    if (!(res as Response).ok)
      throw new Error(`${data.message} (${(res as Response).status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function sendJSON(url: string, upload: PosibleForUpload) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(upload),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await (res as Response).json();

    if (!(res as Response).ok)
      throw new Error(`${data.message} (${(res as Response).status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function AJAX(
  url: string,
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  upload?: PosibleForUpload | string
) {
  try {
    const fetchFc = fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(upload),
    });

    const res = await Promise.race([fetchFc, timeout(TIMEOUT_SEC)]);

    const data = await (res as Response).json();

    if (!(res as Response).ok)
      throw new Error(`${data.message} (${(res as Response).status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
