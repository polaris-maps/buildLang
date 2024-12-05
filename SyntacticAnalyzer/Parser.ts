import { Scanner } from "./Scanner";
import { Token } from "./Token";
import { ErrorReporter } from "../ErrorReporter";
import { AST } from "../AbstractSyntaxTrees/AST";
import { Floorplan } from "../AbstractSyntaxTrees/Floorplan";

export class SyntaxError extends Error {
    private serialVersionID: number = 0;  // change
}

export class Parser {
    private _scanner: Scanner;
    private _errors: ErrorReporter;
    private _currentToken: Token;
    private trace: boolean = false;

    constructor(scanner: Scanner, errors: ErrorReporter) {
        this._scanner = scanner;
        this._errors = errors;
        this._currentToken = this._scanner.scan();
    }

    public parse(): AST | null {
        try {
            // The first thing we need to parse is the Floorplan symbol
            return this.parseFloorplan();
        } catch ( e: any ) {
            return null;
        }
    }


    private parseFloorplan() {
        return new Floorplan(null, null);
    }

    private parseBuilding() {
        
    }

    private parseRoom() {
        
    }

    private parseSide() {
        
    }

    private parseDoorType() {
        
    }
}