import { Injectable } from '@nestjs/common';
import { ICliService } from './interfaces/cli.service.interface';

@Injectable()
export class CliService implements ICliService {
  public initializeCli() {
    console.log('Initializing server with CLI service');
  }
}

