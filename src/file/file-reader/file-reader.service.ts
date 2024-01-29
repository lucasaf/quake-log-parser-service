// src/logs/file-reader.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

@Injectable()
export class FileReaderService {
  async readLines(relativeFilePath: string): Promise<string[]> {
    const lines: string[] = [];
    const filePath = path.resolve(process.cwd(), relativeFilePath);

    const fileStream = fs.createReadStream(filePath);
    const readLines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of readLines) {
      lines.push(line);
    }

    return lines;
  }
}
