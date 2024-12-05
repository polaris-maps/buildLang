import { AST } from "./AST";
import { Token } from "../SyntacticAnalyzer/Token";
import { TokenType } from "../SyntacticAnalyzer/TokenType";

export abstract class Terminal extends AST {
    public kind: TokenType;
    public spelling: string;

    constructor(t: Token){
        super(t.getTokenPosition());
        this.spelling = t.getTokenText();
        this.kind = t.getTokenType();
    }
}