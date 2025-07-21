import { IMessageService } from './IMessageService';

export class RateLimitProxy implements IMessageService {
  private lastSentAt: number = 0;

  constructor(
    private wrappee: IMessageService,
    private intervalMs: number
  ) {}

  send(message: string): void {
    const now = Date.now();
    if (now - this.lastSentAt >= this.intervalMs) {
      this.lastSentAt = now;
      this.wrappee.send(message);
    } else {
      console.log('[RateLimit] skipped');
    }
  }
}

// Фабрика для зручності створення
export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  return new RateLimitProxy(service, intervalMs);
}
