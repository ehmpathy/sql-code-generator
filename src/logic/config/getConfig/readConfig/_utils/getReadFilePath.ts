/*
  we want to enforce users specifying ./ as that will make it more clear that
    we are relative to the directory that that path is defined in

  this is in line with the syntax nodejs imports and require expects
*/
export const getReadFilePath = ({ readRoot, relativePath }: { readRoot: string; relativePath: string }) => {
  const startFromRootDirectory = relativePath.slice(0, 2) === './';
  const startFromAParentDirectory = relativePath.slice(0, 3) === '../';

  // throw error if relative path does not start with ./
  if (!startFromRootDirectory && !startFromAParentDirectory) {
    throw new Error(`all paths must be relative, '${relativePath}' is not; relative paths must start with ./ or ../`);
  }

  // strip ./ from relative path
  const strippedRelativePath = startFromRootDirectory ? relativePath.slice(2) : relativePath; // if starting from parent, no need to modify

  // join read root to relative path
  return `${readRoot}/${strippedRelativePath}`;
};
