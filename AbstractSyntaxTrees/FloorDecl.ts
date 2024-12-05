import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { Visitor } from "./Visitor";
import { RoomList } from "./RoomList";
import { Declaration } from "./Declaration";

export class FloorDecl extends Declaration{
    public roomList: RoomList;

    constructor(n: string, t: null, posn: SourcePosition) {
        super(n, t, posn);
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitFloor(this, arg);
    }

}