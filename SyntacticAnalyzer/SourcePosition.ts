export class SourcePosition {
    private lineNumber: number;
    private columnNumber: number;

    private static LINE_LABEL: string = "line ";
    private static COMMA: string = ", ";
    private static COLUMN_LABEL: string = "column ";

    constructor(lineNumber: number, columnNumber: number) {
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }

    public toString(): string {
        const lineNumberString = this.lineNumber.toString();
        const columnNumberString = this.columnNumber.toString();

        return SourcePosition.LINE_LABEL + lineNumberString + SourcePosition.COMMA + SourcePosition.COLUMN_LABEL + columnNumberString;
    }
}