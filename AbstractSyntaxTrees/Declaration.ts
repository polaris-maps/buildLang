import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";

export abstract class Declaration extends AST {

    public name: string;
    public type: null;

    constructor(name: string, type: null, posn: SourcePosition) {
        super(posn);
        this.name = name;
        this.type = type;
    }
}