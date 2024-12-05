import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { Declaration } from "./Declaration";
import { FloorDeclList } from "./FloorDeclList";
import { Visitor } from "./Visitor";

export class BuildingDecl extends Declaration{
    public floorList: FloorDeclList;

    constructor(n: string, t: null, floorList: FloorDeclList, posn: SourcePosition) {
        super(n, t, posn);
        this.floorList = floorList;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitBuilding(this, arg);
    }

}