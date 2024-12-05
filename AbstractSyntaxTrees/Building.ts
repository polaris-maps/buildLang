import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { FloorList } from "./FloorList";
import { Visitor } from "./Visitor";

export class Building extends AST{
    public name: string;
    public type: null;
    public floorList: FloorList;

    constructor(n: string, t: null, floorList: FloorList, posn: SourcePosition) {
        super(posn);
        this.name = n;
        this.type = t;
        this.floorList = floorList;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitBuilding(this, arg);
    }

}