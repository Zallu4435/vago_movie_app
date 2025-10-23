export class Helpers {
    static generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  
    static isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    static isValidImdbId(imdbId: string): boolean {
      const imdbRegex = /^tt\d{7,10}$/;
      return imdbRegex.test(imdbId);
    }
  
    static sanitizeString(str: string): string {
      return str.trim().replace(/[<>]/g, '');
    }
  
    static delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
  