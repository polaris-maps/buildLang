// from https://www.geeksforgeeks.org/how-to-create-a-stack-in-typescript-using-an-array/ 

export class Stack<T> {
    private items: T[];
    // Private array to store stack elements

    constructor() {
        this.items = [];
        // Initialize the array as empty 
        //when a new stack is created
    }

    // Method to push an 
    // element onto the stack
    push(element: T): void {
        this.items.push(element);
    }

    // Method to pop an 
    // element from the stack
    pop(): T | undefined {
        return this.items.pop();
    }

    // Method to peek the top element
    // of the stack without removing it
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // Method to check
    // if the stack is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Method to get 
    // the size of the stack
    size(): number {
        return this.items.length;
    }

    // Method to
    // clear the stack
    clear(): void {
        this.items = [];
    }

    // Method to print 
    // the elements of the stack
    print(): void {
        console.log(this.items);
    }
}