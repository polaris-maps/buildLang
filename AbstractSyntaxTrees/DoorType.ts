import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { SideList } from "./SideList";
import { Visitor } from "./Visitor";

export class DoorType extends AST{

    constructor(posn: SourcePosition) {
        super(posn);
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitDoorType(this, arg);
    }

}