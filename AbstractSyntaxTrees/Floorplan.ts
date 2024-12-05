import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { BuildingDeclList } from "./BuildingDeclList";
import { Visitor } from "./Visitor";

export class Floorplan extends AST {

    public buildingList: BuildingDeclList;
    
    constructor(bl: BuildingDeclList, posn: SourcePosition) {
        super(posn);
        this.buildingList = bl;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitFloorplan(this, arg);
    }
}