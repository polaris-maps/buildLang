import { ErrorReporter } from "../ErrorReporter";
import { InputStream } from "../InputStream";
import { StringBuilder } from "../StringBuilder";
import { SourcePosition } from "./SourcePosition";
import { Token } from "./Token";
import { TokenType } from "./TokenType";


export class Scanner {
    private _in: InputStream;
    private _errors: ErrorReporter;
    private _currentText: StringBuilder;
    private _currentChar: string;  // actually char

    // true when there are no more tokens
    private _eot: boolean = false;

    // position tracking
    private _lineNumber: number = 1;
    private _columnNumber: number = 0;

    private SPACE: string = " ";
    private TAB: string = "\t";
    private CARRIAGE_RETURN: string = "\r";
    private NEWLINE: string = "\n";

    constructor (in_stream: InputStream, errors: ErrorReporter) {
        this._in = in_stream;
        this._errors = errors;
        this._currentText = new StringBuilder();  // convert to StringBuilder

        this.nextChar();
    }

    private nextChar(): void  {
        try {
            // read in a character
            const c = this._in.read();
            this._currentChar = c;

            if (c == "-1") {
                // if c = -1, no more tokens, set _eot to true
                this._eot = true;
            } else if (c.charCodeAt(0) > 127) {
                // throw an error if not regular ASCII
                this.scanError("Not ASCII");
                this._eot = true;
            }
            
            // track position
            if (this._currentChar == this.NEWLINE) {
                this._lineNumber += 1;
            } else {
                this._columnNumber += 1;
            }
        } catch (error) {
            this._eot = true;
        }
    }

    /**
     * This function should check the current char to determine what the token could be.
     * 
     * @returns Token from the input string.
     */
    public scan(): Token {

        // If the current char is whitespace, skip it
        while (!this._eot && (this._currentChar == this.SPACE 
            || this._currentChar == this.TAB
            || this._currentChar == this.CARRIAGE_RETURN
            || this._currentChar == this.NEWLINE)) {
            this.skipIt();
        }

        // Skip comments (// or /* */)
        while (this._currentChar == "/") {
            this.takeIt();  // Will only skip retroactively if truly a comment

            if (this._currentChar == "/") {
                this.skipIt();

                // Clear _currentText (skip first '/' retroactively)
                this.clearCurrentText();

                // Single line comment, skip until end of line
                while (!this._eot && !(this._currentChar == this.CARRIAGE_RETURN 
                    || this._currentChar == this.NEWLINE)) {
                    this.skipIt();
                }
            } else if (this._currentChar == "*") {
                this.skipIt();

                // Clear _currentText (skip first '/' retroactively)
                this.clearCurrentText();

                // Multiple line comment, keep skipping until detect '*/'
                var asteriskPrevious: boolean = false;

                while (!this._eot && !(asteriskPrevious && this._currentChar == "/")) {
                    if (this._currentChar == "*") {
                        asteriskPrevious = true;
                    } else {
                        asteriskPrevious = false;
                    }
                    this.skipIt();
                }

                // detected / at end of multiple-line comment, skip it
                if (this._currentChar == "/") {
                    this.skipIt();
                } else {
                    // Unterminated comment
                    this.scanError("Unterminated comment");
                }
            } else {
                // TODO: do nothing since we're not returning the division operator (reset? keep going?)
            }

            // If the current char is whitespace, skip it
            while (!this._eot && (this._currentChar == this.SPACE 
                || this._currentChar == this.TAB
                || this._currentChar == this.CARRIAGE_RETURN
                || this._currentChar == this.NEWLINE)) {
                this.skipIt();
            }
        }

        // If there are no more tokens, return an end of token
        if (this._eot) {
            return this.makeToken(TokenType.EOT);
        }

        // Determine what the token is.
        const tokenType: TokenType = this.scanToken();

        // Make and return the token.
        return this.makeToken(tokenType);
    }

    private takeIt(): void {
        this._currentText.append(this._currentChar);
        this.nextChar();
    }

    private skipIt(): void {
        this.nextChar();
    }

    private clearCurrentText(): void {
        this._currentText.clearCurrentText();
    }

    private makeToken(tokenType: TokenType): Token {
        // Save current text
        const tokenText: string = this._currentText.toString();

        // Clear current text
        this.clearCurrentText();

        // Building source position
        const currentSourcePosition: SourcePosition = new SourcePosition(this._lineNumber, this._columnNumber);

        // Return a new Token with the appropriate type and text contained in it
        return new Token(tokenType, tokenText, currentSourcePosition);
    }

    private scanToken(): TokenType {
        // If there are no more tokens, return an end of token
        if (this._eot) {
            return TokenType.EOT;
        }

        if (this.isAlpha(this._currentChar)) {
            while (this.isAlpha(this._currentChar) || this.isDigit(this._currentChar) 
                || this.isUnderscore(this._currentChar) || this.isPeriod(this._currentChar)) {
                this.takeIt();
            }

            switch (this._currentText.toString()) {
                case "building":
                    return TokenType.BUILDING_TYPE;
                case "floor":
                    return TokenType.FLOOR_TYPE;
                // case "open":
                //     return TokenType.OPEN;
                case "true": case "false":
                    return TokenType.BOOLEAN_LITERAL;
                default:
                    return TokenType.IDENTIFIER;
            }
        } else if (this.isDigit(this._currentChar)) {
            while (this.isAlpha(this._currentChar) || this.isDigit(this._currentChar) 
                || this.isUnderscore(this._currentChar) || this.isPeriod(this._currentChar)) {
                this.takeIt();
            }
            return TokenType.IDENTIFIER;
        } else {
            switch (this._currentChar) {
                case "{":
                    this.takeIt();
                    return TokenType.LBRACE;
                case "}":
                    this.takeIt();
                    return TokenType.RBRACE;
                case "(":
                    this.takeIt();
                    return TokenType.LPAREN;
                case ")":
                    this.takeIt();
                    return TokenType.RPAREN;
                case ",":
                    this.takeIt();
                    return TokenType.COMMA;
                case ".":
                    this.takeIt();
                    return TokenType.PERIOD;
                case ";":
                    this.takeIt();
                    return TokenType.SEMICOLON;
                case "|":
                    this.takeIt();
                    return TokenType.HALLWAY;
                case "=":
                    this.takeIt();
                    return TokenType.ASSIGN;
                // case "-":
                //     this.takeIt();
                //     return TokenType.RANGE;
                default:
                    this.scanError("Unrecognized character '" + this._currentChar + "' in input");
                    return TokenType.ERROR;
            }
        }
    }

    private isAlpha(ch: string) {
        // from https://stackoverflow.com/questions/40120915/javascript-function-that-returns-true-if-a-letter 
        return typeof ch === "string" && ch.length === 1
               && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
    }

    private isDigit(ch: string) {
        return typeof ch === "string" && ch.length === 1 && (ch >= "0" && ch <= "9" );
    }

    private isAlphaNumeric(ch: string) {
        return this.isAlpha(ch) || this.isDigit(ch);
    }

    private isUnderscore(ch: string) { 
        return typeof ch === "string" && ch.length === 1 && (ch == "_" );
    }

    private isPeriod(ch: string) { 
        return typeof ch === "string" && ch.length === 1 && (ch == "." );
    }

    private scanError(error: string): void {
        this._errors.reportError("Scan Error: " + error);
    }
}