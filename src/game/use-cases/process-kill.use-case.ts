import { Game } from '../entities/game.entity';
import { IProcessKillUseCase } from './interfaces/process-kill.use-case.interface';

export class ProcessKillUseCase implements IProcessKillUseCase {
  constructor(private game: Game) {}

  public setGame(game: Game): void {
    this.game = game;
  }

  public execute(killer: string, killed: string): void {
    this.game.totalKills++;

    if (killer !== '<world>') {
      this.game.kills[killer] = (this.game.kills[killer] || 0) + 1;
    }

    if (killer === '<world>' && this.game.kills[killed] !== undefined) {
      this.game.kills[killed] = Math.max(0, this.game.kills[killed] - 1);
    } else {
      this.game.kills[killed] = this.game.kills[killed] || 0;
    }
  }
}
