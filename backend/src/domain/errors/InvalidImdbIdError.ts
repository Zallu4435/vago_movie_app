import { DomainError } from './DomainError';

export class InvalidImdbIdError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
