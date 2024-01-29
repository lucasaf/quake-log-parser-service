import { Test, TestingModule } from '@nestjs/testing';
import { Game } from '../entities/game.entity';
import { AddPlayerUseCase } from './add-player.use-case';

describe('AddPlayerUseCase', () => {
  let game: Game;
  let addPlayerUseCase: AddPlayerUseCase;

  beforeEach(async () => {
    game = { players: [], kills: {} } as Game;

    const module: TestingModule = await Test.createTestingModule({
      providers: [Game, AddPlayerUseCase],
    }).compile();

    game = module.get<Game>(Game);
    addPlayerUseCase = module.get<AddPlayerUseCase>(AddPlayerUseCase);

    addPlayerUseCase = new AddPlayerUseCase();
    addPlayerUseCase.setGame(game);
  });

  it('should add a new player if not already in the game', () => {
    const player = 'Player1';

    addPlayerUseCase.execute(player);

    expect(game.players).toContain(player);
    expect(game.kills[player]).toBe(0);
  });

  it('should not add a player if they are already in the game', () => {
    const player = 'Player1';

    addPlayerUseCase.execute(player);
    addPlayerUseCase.execute(player);

    expect(game.players.filter((p) => p === player).length).toBe(1);
  });

  it('should add multiple different players to the game', () => {
    const players = ['Player2', 'Player3', 'Player4'];

    players.forEach((player) => {
      addPlayerUseCase.execute(player);
    });

    players.forEach((player) => {
      expect(game.players).toContain(player);
      expect(game.kills[player]).toBe(0);
    });

    expect(game.players.length).toBe(players.length);
  });
});
