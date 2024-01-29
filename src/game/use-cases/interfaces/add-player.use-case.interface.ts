import { Game } from '../../entities/game.entity';

export interface IAddPlayerUseCase {
  setGame(game: Game): void;
  execute(player: string): void;
}
