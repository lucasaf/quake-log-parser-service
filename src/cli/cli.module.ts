import { Module } from '@nestjs/common';
import { CliService } from './services/cli.service';

@Module({
  providers: [CliService],
  exports: [CliService],
})
export class CliModule {}
