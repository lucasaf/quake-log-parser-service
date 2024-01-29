export class Game {
  id: number;
  totalKills: number;
  players: string[];
  kills: { [player: string]: number };
  killsByMeans: { [key: string]: number };

  constructor(id: number) {
    this.id = id;
    this.totalKills = 0;
    this.players = [];
    this.kills = {};
    this.killsByMeans = {};
  }
}
