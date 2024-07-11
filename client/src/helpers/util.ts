export const _sessionStorage = {
  getWithExpiry(key: string): object | null {
    try {
      const obj: { expiryTime: number; value: object } = JSON.parse(
        sessionStorage.getItem(key) ?? '',
      );
      if (obj.expiryTime > new Date().getTime()) {
        return obj.value;
      } else {
        sessionStorage.removeItem(key);
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  setWithExpiry(key: string, value: object, ttl: number = 3600): void {
    const objToStore = { value, expiryTime: new Date().getTime() + ttl * 1000 };
    sessionStorage.setItem(key, JSON.stringify(objToStore));
  },
};
