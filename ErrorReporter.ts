export class ErrorReporter {
    private errorQueue: string[];

    constructor() {
        this.errorQueue = [];
    }

    public hasErrors(): boolean {
        // Check if errorQueue is non-empty
        return this.errorQueue.length > 0;
    }

    public outputErrors(): void {
        // Output all errors in the errorQueue
        for (const error of this.errorQueue) {
            console.error(error);
        }
    }

    public reportError(...error: string[]): void {
        const errorMessage = error.join("");
        this.errorQueue.push(errorMessage);
    }
}

// TODO: Enhance this class to support error messages with line numbers and additional metadata.
