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

  it('should track multiple kills by the same player', () => {
    const killer = 'Player3';
    const killed = ['Player1', 'Player2'];
    const mod = 'MOD_SHOTGUN';

    killed.forEach((victim) => {
      processKillUseCase.execute(killer, victim, mod);
    });

    expect(game.kills[killer]).toBe(killed.length);
    expect(game.killsByMeans[mod]).toBe(killed.length);
  });

  it('should not increment killer score when <world> kills', () => {
    const killer = '<world>';
    const killed = 'Player4';
    const mod = 'MOD_LAVA';

    processKillUseCase.execute(killer, killed, mod);

    expect(game.kills[killer]).toBeUndefined();
    expect(game.killsByMeans[mod]).toBe(1);
  });

  it('should correctly track deaths by different MODs', () => {
    processKillUseCase.execute('Player5', 'Player6', 'MOD_PLASMA');
    processKillUseCase.execute('Player5', 'Player7', 'MOD_GRENADE');

    expect(game.killsByMeans['MOD_PLASMA']).toBe(1);
    expect(game.killsByMeans['MOD_GRENADE']).toBe(1);
  });

  it('should correctly track kills when the same player is killed by different killers', () => {
    const killed = 'Player8';
    const killers = ['Player9', 'Player10', 'Player11'];
    const mod = 'MOD_MACHINEGUN';

    killers.forEach((killer) => {
      processKillUseCase.execute(killer, killed, mod);
    });

    expect(game.totalKills).toBe(killers.length);
    killers.forEach((killer) => {
      expect(game.kills[killer]).toBe(1);
    });
    expect(game.killsByMeans[mod]).toBe(killers.length);
  });
});
