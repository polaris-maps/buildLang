export class StringBuilder {
    private _strings: string[] = [];

    constructor () {
        // nothing to do here
    }

    public append(str: string): void {
        this._strings.push(str);
    }

    public toString(): string {
        return this._strings.join("");
    }

    public clearCurrentText(): void {
        this._strings = [];
    }
}