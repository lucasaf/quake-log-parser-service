import { Module } from '@nestjs/common';
import { FileWriterService } from '../file/file-writer/file-writer.service';
import { FileModule } from '../file/file.module';
import { LogParserModule } from '../log-parser/log-parser.module';
import { CliService } from './services/cli.service';

@Module({
  imports: [LogParserModule, FileModule],
  providers: [CliService, FileWriterService],
  exports: [CliService],
})
export class CliModule {}
