import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { GameModule } from '../game/game.module';
import { LogParserService } from './services/log-parser.service';
import { LOG_PARSER_SERVICE } from './shared/constants';

@Module({
  imports: [FileModule, GameModule],
  providers: [{ provide: LOG_PARSER_SERVICE, useClass: LogParserService }],
  exports: [LOG_PARSER_SERVICE],
})
export class LogParserModule {}
