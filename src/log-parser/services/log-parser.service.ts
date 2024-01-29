import { Inject, Injectable } from '@nestjs/common';
import { FileReaderService } from '../../file/file-reader/file-reader.service';
import { Game } from '../../game/entities/game.entity';
import {
  ADD_PLAYER_USE_CASE,
  PROCESS_KILL_USE_CASE,
} from '../../game/shared/constants';
import { IAddPlayerUseCase } from '../../game/use-cases/interfaces/add-player.use-case.interface';
import { IProcessKillUseCase } from '../../game/use-cases/interfaces/process-kill.use-case.interface';
import { ILogParserService } from './interfaces/log-parser.service.interface';

@Injectable()
export class LogParserService implements ILogParserService {
  constructor(
    private readonly fileReaderService: FileReaderService,
    @Inject(ADD_PLAYER_USE_CASE)
    private addPlayerUseCase: IAddPlayerUseCase,
    @Inject(PROCESS_KILL_USE_CASE)
    private processKillUseCase: IProcessKillUseCase,
  ) {}

  async parseLogFile(filePath: string): Promise<Game[]> {
    const lines = await this.fileReaderService.readLines(filePath);
    const games: Game[] = [];
    let gameId = 1;
    let currentGame;

    for await (const line of lines) {
      if (line.includes('InitGame:')) {
        if (currentGame) {
          games.push(currentGame);
        }

        currentGame = new Game(gameId++);
      } else if (line.includes('ClientUserinfoChanged:')) {
        this.processPlayerLine(line, currentGame);
      } else if (line.includes('Kill:')) {
        this.processKillLine(line, currentGame);
      }
    }

    // Adiciona o último jogo se tiver atividade
    if (currentGame) {
      games.push(currentGame);
    }

    return games;
  }

  private processPlayerLine(line: string, currentGame: Game): void {
    const parts = line.match(/ClientUserinfoChanged: \d+ n\\(.+?)\\/);

    if (parts && parts[1]) {
      const player = parts[1];

      this.addPlayerUseCase.setGame(currentGame);
      this.addPlayerUseCase.execute(player);
    }
  }

  private processKillLine(line: string, currentGame: Game): void {
    const parts = line.match(/Kill: \d+ \d+ \d+: (.+) killed (.+) by \w+/);

    if (!parts) return;

    const [, killer, killed] = parts;

    this.processKillUseCase.setGame(currentGame);
    this.processKillUseCase.execute(killer, killed);
  }
}
