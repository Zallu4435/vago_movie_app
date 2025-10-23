export class Validator {
    static isEmail(value: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
  
    static isStrongPassword(password: string): boolean {
      return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password)
      );
    }
  
    static isImdbId(value: string): boolean {
      const imdbRegex = /^tt\d{7,10}$/;
      return imdbRegex.test(value);
    }
  
    static isUUID(value: string): boolean {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    }
  
    static isEmpty(value: any): boolean {
      return (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
      );
    }
  }
  