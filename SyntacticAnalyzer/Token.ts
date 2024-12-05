import { TokenType } from "./TokenType";
import { SourcePosition } from "./SourcePosition";

export class Token {
    private type: TokenType;
    private text: string;
    private position: SourcePosition;

    constructor(type: TokenType, text: string, position: SourcePosition) {
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

    public getTokenText(): string {
        return this.text;
    }

    public getTokenPosition(): SourcePosition {
        return this.position;
    }
}