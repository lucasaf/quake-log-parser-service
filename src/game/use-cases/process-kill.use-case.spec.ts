import { Test, TestingModule } from '@nestjs/testing';
import { Game } from '../entities/game.entity';
import { ProcessKillUseCase } from './process-kill.use-case';

describe('ProcessKillUseCase', () => {
  let game: Game;
  let processKillUseCase: ProcessKillUseCase;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [Game, ProcessKillUseCase],
    }).compile();

    game = moduleRef.get<Game>(Game);
    processKillUseCase = moduleRef.get<ProcessKillUseCase>(ProcessKillUseCase);
    processKillUseCase.setGame(game);
  });

  it('should increase total kills and player kills', () => {
    const killer = 'Player1';
    const killed = 'Player2';
    const mod = 'MOD_RAILGUN';

    processKillUseCase.execute(killer, killed, mod);

    expect(game.totalKills).toBe(1);
    expect(game.kills[killer]).toBe(1);
    expect(game.killsByMeans[mod]).toBe(1);
  });

  it('should decrease kills when killed by <world>', () => {
    const killer = '<world>';
    const killed = 'Player1';
    const mod = 'MOD_RAILGUN';

    game.kills[killed] = 1;

    processKillUseCase.execute(killer, killed, mod);

    expect(game.kills[killed]).toBe(0);
    expect(game.killsByMeans[mod]).toBe(1);
  });
});
