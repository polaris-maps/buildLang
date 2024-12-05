import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { Visitor } from "./Visitor";

export class Building extends AST{
    public name: string;
    public type: null;

    constructor(n: string, t: null, posn: SourcePosition) {
        super(posn);
        this.name = n;
        this.type = t;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        throw new Error("Method not implemented.");
    }

}