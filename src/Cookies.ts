export default class Cookies {
    static get(name: string): string | undefined {
        const regex = new RegExp(`${name}=(.+?)[;\\s]`);
        return (document.cookie)?.match(regex)?.[1];
    }
    static set(name: string, value: string): void {
        document.cookie = `${name}=${value}`;
    }
}