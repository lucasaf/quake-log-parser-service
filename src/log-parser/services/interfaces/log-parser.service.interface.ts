import { Game } from '../../../game/entities/game.entity';

export interface ILogParserService {
  parseLogFile(filePath: string): Promise<Game[]>;
}
