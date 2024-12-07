import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { Visitor } from "./Visitor";
import { RoomDoorList } from "./RoomDoorList";

export class Side extends AST{
    public roomDoorList: RoomDoorList | null;

    constructor(rdl: RoomDoorList | null, posn: SourcePosition) {
        super(posn);
        this.roomDoorList = rdl;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitSide(this, arg);
    }

}