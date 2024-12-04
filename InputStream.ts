export class InputStream {
    private data: string;
    private position: number = 0;
  
    constructor(data: string) {
      this.data = data;
    }
  
    public read(): string {
      if (this.position >= this.data.length) {
        return "-1"; // End of stream
      }
      return this.data.charAt(this.position++);
    }
  
    public close(): void {
      // Perform cleanup if necessary
    }
}