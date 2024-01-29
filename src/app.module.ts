import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CliModule } from './cli/cli.module';
import { FileModule } from './file/file.module';
import { GameModule } from './game/game.module';
import { LogParserModule } from './log-parser/log-parser.module';

@Module({
  imports: [CliModule, FileModule, GameModule, LogParserModule],
  providers: [AppService],
})
export class AppModule {}
