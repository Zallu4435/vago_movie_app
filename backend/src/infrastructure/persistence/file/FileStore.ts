import * as fs from 'fs';
import * as path from 'path';

export class FileStore<T> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.ensureDirectoryExists();
  }

  private ensureDirectoryExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  read(): T[] {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error(`Error reading from ${this.filePath}:`, error);
      return [];
    }
  }

  write(data: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing to ${this.filePath}:`, error);
    }
  }

  append(item: T): void {
    const data = this.read();
    data.push(item);
    this.write(data);
  }

  clear(): void {
    this.write([]);
  }
}
