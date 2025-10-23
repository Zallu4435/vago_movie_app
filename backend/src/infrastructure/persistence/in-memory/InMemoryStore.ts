export class InMemoryStore<T> {
    private store: Map<string, T> = new Map();
  
    set(key: string, value: T): void {
      this.store.set(key, value);
    }
  
    get(key: string): T | undefined {
      return this.store.get(key);
    }
  
    has(key: string): boolean {
      return this.store.has(key);
    }
  
    delete(key: string): boolean {
      return this.store.delete(key);
    }
  
    clear(): void {
      this.store.clear();
    }
  
    values(): T[] {
      return Array.from(this.store.values());
    }
  
    keys(): string[] {
      return Array.from(this.store.keys());
    }
  
    size(): number {
      return this.store.size;
    }
  }
  