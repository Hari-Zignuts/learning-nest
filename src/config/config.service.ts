import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigAppService {
  constructor(private confgiService: ConfigService) {}
  getPort(): number {
    const port = this.confgiService.get<number>('port') || 3000;
    return port;
  }
}
