import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { BuildingList } from "./BuildingList";
import { Visitor } from "./Visitor";

export class Floorplan extends AST {

    public buildingList: BuildingList;
    
    constructor(bl: BuildingList, posn: SourcePosition) {
        super(posn);
        this.buildingList = bl;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitFloorplan(this, arg);
    }
}