export function decodeToken(token:any) {
    const _decodeToken = (token:any) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token
      .split('.')
      .map((token: any) => _decodeToken(token))
      .reduce((acc: any, curr: any) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }