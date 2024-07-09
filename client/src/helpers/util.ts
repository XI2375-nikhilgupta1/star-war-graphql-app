export class _sessionStorage  {
    static getWithExpiry(key: string){
        try {
            const obj:{expiryTime: number, value: any} = JSON.parse(sessionStorage.getItem(key) || "");
            if(obj.expiryTime > new Date().getTime()){
                return obj.value;
            } else {
                sessionStorage.removeItem(key);
                return null;
            }
        } catch(e){
            return null
        }
        
    }
    static setWithExpiry(key: string, value: any, ttl: number = 3600){
        const objToStore = {value, expiryTime: new Date().getTime() + ttl*1000}
        sessionStorage.setItem(key, JSON.stringify(objToStore));
    }
};
