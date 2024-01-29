import { Test, TestingModule } from '@nestjs/testing';
import { FileWriterService } from '../../file/file-writer/file-writer.service';
import { LogParserService } from '../../log-parser/services/log-parser.service';
import { LOG_PARSER_SERVICE } from '../../log-parser/shared/constants';
import { CliService } from './cli.service';

describe('CliService', () => {
  let service: CliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CliService,
        FileWriterService,
        {
          provide: LOG_PARSER_SERVICE,
          useValue: LogParserService,
        },
      ],
    }).compile();

    service = module.get<CliService>(CliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
