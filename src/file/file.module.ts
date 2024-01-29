import { Module } from '@nestjs/common';
import { FileReaderService } from './file-reader/file-reader.service';
import { FileWriterService } from './file-writer/file-writer.service';

@Module({
  providers: [FileReaderService, FileWriterService],
  exports: [FileReaderService],
})
export class FileModule {}
