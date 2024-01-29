import { Inject, Injectable } from '@nestjs/common';
import { FileWriterService } from '../../file/file-writer/file-writer.service';
import { ILogParserService } from '../../log-parser/services/interfaces/log-parser.service.interface';
import { LOG_PARSER_SERVICE } from '../../log-parser/shared/constants';
import { ICliService } from './interfaces/cli.service.interface';

@Injectable()
export class CliService implements ICliService {
  constructor(
    @Inject(LOG_PARSER_SERVICE)
    private logParserService: ILogParserService,
    private readonly fileWriterService: FileWriterService,
  ) {}

  public async initializeCli() {
    const filePath = 'src/assets/inputs/qgames.log';
    const games = await this.logParserService.parseLogFile(filePath);

    console.log('Log analysis completed:', games);
    this.fileWriterService.saveExtractedDataAsJSON(games);
  }
}
