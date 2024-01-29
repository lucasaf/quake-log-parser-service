import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileWriterService {
  public saveExtractedDataAsJSON(extractedData) {
    const directory = path.join(__dirname, 'extractedData');

    const date = new Date().toISOString();

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const filename = `exportedData_${date}.json`;
    const jsonFilePath = path.join(directory, filename);

    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(extractedData, null, 2),
      'utf-8',
    );

    console.log(`The data file was extracted to: ${jsonFilePath}`);
  }
}
