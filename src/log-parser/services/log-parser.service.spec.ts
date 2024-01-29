import { Test, TestingModule } from '@nestjs/testing';
import { FileReaderService } from '../../file/file-reader/file-reader.service';
import {
  ADD_PLAYER_USE_CASE,
  PROCESS_KILL_USE_CASE,
} from '../../game/shared/constants';
import { AddPlayerUseCase } from '../../game/use-cases/add-player.use-case';
import { ProcessKillUseCase } from '../../game/use-cases/process-kill.use-case';
import { LogParserService } from './log-parser.service';

describe('LogParserService', () => {
  let service: LogParserService;
  let fileReaderService: FileReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogParserService,
        FileReaderService,
        {
          provide: ADD_PLAYER_USE_CASE,
          useClass: AddPlayerUseCase,
        },
        {
          provide: PROCESS_KILL_USE_CASE,
          useClass: ProcessKillUseCase,
        },
      ],
    }).compile();

    fileReaderService = module.get<FileReaderService>(FileReaderService);
    service = module.get<LogParserService>(LogParserService);
  });

  it('should correctly parse log file', async () => {
    jest
      .spyOn(fileReaderService, 'readLines')
      .mockResolvedValue([
        '20:34 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0',
        'ClientConnect: 2',
        '20:34 ClientUserinfoChanged: 2 n\\Player1\\t\\0\\model\\xian/default\\hmodel\\xian/...',
        'ClientBegin: 2',
        'ClientConnect: 2',
        '20:34 ClientUserinfoChanged: 2 n\\Player3\\t\\0\\model\\xian/default\\hmodel\\xian/...',
        'ClientBegin: 2',
        '21:15 Kill: 1022 2 22: <world> killed Player1 by MOD_TRIGGER_HURT',
        '22:05 Kill: 2 3 10: Player1 killed Player3 by MOD_RAILGUN',
        '22:34 ShutdownGame:',
      ]);

    const games = await service.parseLogFile('path/to/logfile');

    expect(games).toHaveLength(1);
    expect(games[0].totalKills).toBe(2);
    expect(games[0].players).toContain('Player1');
    expect(games[0].players).toContain('Player3');
    expect(games[0].killsByMeans['MOD_TRIGGER_HURT']).toBe(1);
    expect(games[0].killsByMeans['MOD_RAILGUN']).toBe(1);
  });
});
