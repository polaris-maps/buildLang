import { Token } from "../SyntacticAnalyzer/Token";
import { Terminal } from "./Terminal";
import { Visitor } from "./Visitor";
import { Declaration } from "./Declaration";

export class Identifier extends Terminal {

    private decl: Declaration | null;

    constructor(t: Token) {
        super(t);
        this.decl = null;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitIdentifier(this, arg);
    }
}