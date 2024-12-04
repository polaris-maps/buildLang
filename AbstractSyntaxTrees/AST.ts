import { TokenType } from "../SyntacticAnalyzer/TokenType";
import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { ASTDisplay } from "./ASTDisplay";
import { Visitor } from "./Visitor";

export abstract class AST {
    public posn: SourcePosition;

    constructor(posn: SourcePosition) {
        this.posn = posn;
    }

    public toString(): string {
        const fullClassName = this.constructor.name;
        let className = fullClassName;

        if (ASTDisplay.showPosition && this.posn) {
            className += ` ${this.posn.toString()}`;
        }

        return className;
    }

    public abstract visit<A, R>(visitor: Visitor<A, R>, arg: A): R;
}