import { Token } from "../SyntacticAnalyzer/Token";
import { Terminal } from "./Terminal";
import { Visitor } from "./Visitor";

export class BooleanLiteral extends Terminal {

    constructor(t: Token) {
        super(t);
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitBooleanLiteral(this, arg);
    }
}