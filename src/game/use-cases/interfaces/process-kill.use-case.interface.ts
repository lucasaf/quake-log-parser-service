import { Game } from '../../entities/game.entity';

export interface IProcessKillUseCase {
  setGame(game: Game): void;
  execute(killer: string, killed: string): void;
}
