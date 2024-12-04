import { TokenType } from "./TokenType";
import { SourcePosition } from "./SourcePosition";

export class Token {
    private type: TokenType;
    private text: string | null;
    private position: SourcePosition | null;

    constructor(type: TokenType, text: string | null, position: SourcePosition | null) {
        if (type != null) {
            this.type = type;
        } else {
            throw new Error("TokenType cannot be null");
        }

        this.text = text;
        this.position = position;
    }

    public getTokenType(): TokenType {
        return this.type;
    }

    public getTokenText(): string | null {
        return this.text;
    }

    public getTokenPosition(): SourcePosition | null {
        return this.position;
    }
}