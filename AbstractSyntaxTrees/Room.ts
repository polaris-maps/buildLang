import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { SideList } from "./SideList";
import { Visitor } from "./Visitor";

export class Room extends AST{
    public name: string;
    public type: null;
    public sideList: SideList | null;

    constructor(n: string, t: null, sideList: SideList | null, posn: SourcePosition) {
        super(posn);
        this.name = n;
        this.type = t;
        this.sideList = sideList;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitRoom(this, arg);
    }

}