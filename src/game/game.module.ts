import { Module } from '@nestjs/common';
import { ADD_PLAYER_USE_CASE, PROCESS_KILL_USE_CASE } from './shared/constants';
import { AddPlayerUseCase } from './use-cases/add-player.use-case';
import { ProcessKillUseCase } from './use-cases/process-kill.use-case';

@Module({
  providers: [
    {
      provide: ADD_PLAYER_USE_CASE,
      useClass: AddPlayerUseCase,
    },
    {
      provide: PROCESS_KILL_USE_CASE,
      useClass: ProcessKillUseCase,
    },
  ],
  exports: [ADD_PLAYER_USE_CASE, PROCESS_KILL_USE_CASE],
})
export class GameModule {}
