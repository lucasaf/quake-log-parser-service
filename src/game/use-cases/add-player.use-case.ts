import { Game } from '../entities/game.entity';
import { IAddPlayerUseCase } from './interfaces/add-player.use-case.interface';

export class AddPlayerUseCase implements IAddPlayerUseCase {
  private game: Game;

  public setGame(game: Game): void {
    this.game = game;
  }

  public execute(player: string): void {
    if (!this.game.players.includes(player)) {
      this.game.players.push(player);
      this.game.kills[player] = 0;
    } else {
      this.game.kills[player] = 0;
    }
  }
}
