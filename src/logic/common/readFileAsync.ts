import fs from 'fs';

export const readFileAsync = ({ filePath }: { filePath: string }): Promise<string> =>
  new Promise((resolve) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
