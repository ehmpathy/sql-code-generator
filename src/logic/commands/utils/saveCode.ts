import { mkdir, writeFile } from './fileIO';

export const saveCode = async ({ rootDir, filePath, code }: { rootDir: string; filePath: string; code: string }) => {
  // absolute file path
  const absoluteFilePath = `${rootDir}/${filePath}`;
  const targetDirPath = absoluteFilePath
    .split('/')
    .slice(0, -1)
    .join('/');

  // ensure directory is defined
  await mkdir(targetDirPath).catch((error) => {
    if (error.code !== 'EEXIST') throw error;
  }); // mkdir and ignore if dir already exists

  // write the resource sql to that dir
  await writeFile(absoluteFilePath, code);
};
