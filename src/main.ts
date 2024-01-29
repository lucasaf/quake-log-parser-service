import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './cli/services/cli.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cliService = app.get(CliService);

  console.log('Starting the application');

  try {
    await cliService.initializeCli();
    console.log('Finishing the application');
  } catch (error) {
    console.error('An error occurred:', error);
  }

  process.exit(0);
}
bootstrap();
