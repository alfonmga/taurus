import { Controller, Get } from '@nestjs/common'
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus'

@Controller('/')
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get('/health')
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('db', { timeout: 300 })])
  }
}
