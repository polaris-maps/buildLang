import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { SideList } from "./SideList";
import { Visitor } from "./Visitor";

export class DoorType extends AST{
    public name: string;
    public type: null;

    constructor(n: string, t: null, posn: SourcePosition) {
        super(posn);
        this.name = n;
        this.type = t;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitDoorType(this, arg);
    }

}