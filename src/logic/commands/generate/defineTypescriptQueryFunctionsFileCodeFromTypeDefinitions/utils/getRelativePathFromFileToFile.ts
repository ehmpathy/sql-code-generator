import path from 'path';

export const getRelativePathFromFileToFile = ({ fromFile, toFile }: { fromFile: string; toFile: string }) => {
  let relativePath = path.relative(fromFile, toFile);

  // the module always adds an extra step up. remove it
  relativePath = relativePath.replace(/^..\//, '');
  if (relativePath[0] !== '.') relativePath = `./${relativePath}`; // if it was in same dir, then add the "same dir" spec

  // drop the extension
  relativePath = relativePath
    .split('.')
    .slice(0, -1)
    .join('.');

  // return the cleaned up path
  return relativePath;
};
