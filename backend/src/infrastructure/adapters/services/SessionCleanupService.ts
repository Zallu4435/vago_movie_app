import { ISessionCleanupService } from '../../../application/ports/services/ISessionCleanupService';
import { IFavoriteRepository } from '../../../application/ports/repositories/IFavoriteRepository';
import { Logger } from '../../../shared/utils/logger';
import { SessionConfig } from '../../../shared/constants/sessionConfig';

export class SessionCleanupService implements ISessionCleanupService {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly cleanupIntervalMs: number;

  constructor(
    private readonly favoriteRepository: IFavoriteRepository,
    cleanupIntervalMinutes: number = SessionConfig.CLEANUP_INTERVAL_MINUTES
  ) {
    this.cleanupIntervalMs = cleanupIntervalMinutes * 60 * 1000;
  }

  start(): void {
    if (this.intervalId) {
      Logger.warn('SessionCleanupService is already running');
      return;
    }

    Logger.info(`SessionCleanupService started - running every ${this.cleanupIntervalMs / 60000} minutes`);

    this.runCleanup().catch((error) => {
      Logger.error('Initial cleanup failed:', error);
    });

    this.intervalId = setInterval(() => {
      this.runCleanup().catch((error) => {
        Logger.error('Scheduled cleanup failed:', error);
      });
    }, this.cleanupIntervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      Logger.info('SessionCleanupService stopped');
    }
  }

  async runCleanup(): Promise<void> {
    Logger.info('Running session cleanup...');
    
    const beforeCount = this.favoriteRepository.getAllSessionIds().length;
    await this.favoriteRepository.cleanupExpired();
    const afterCount = this.favoriteRepository.getAllSessionIds().length;
    
    const cleaned = beforeCount - afterCount;
    if (cleaned > 0) {
      Logger.info(`Session cleanup completed - removed ${cleaned} expired session(s)`);
    } else {
      Logger.info('Session cleanup completed - no expired sessions found');
    }
  }
}
