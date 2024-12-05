import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { Visitor } from "./Visitor";
import { RoomList } from "./RoomList";

export class Side extends AST{
    public name: string;
    public type: null;
    public roomList: RoomList;

    constructor(n: string, t: null, posn: SourcePosition) {
        super(posn);
        this.name = n;
        this.type = t;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitSide(this, arg);
    }

}