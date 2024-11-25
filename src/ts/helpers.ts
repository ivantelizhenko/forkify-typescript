import { TIMEOUT_SEC } from './config';

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
