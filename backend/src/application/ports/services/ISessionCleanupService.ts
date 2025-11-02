export interface ISessionCleanupService {
  start(): void;
  stop(): void;
  runCleanup(): Promise<void>;
}
