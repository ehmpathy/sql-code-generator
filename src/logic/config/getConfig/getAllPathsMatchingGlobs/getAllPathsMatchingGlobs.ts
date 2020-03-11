import fg from 'fast-glob';

export const getAllPathsMatchingGlobs = ({
  globs,
  root,
  absolute,
}: {
  globs: string[];
  root: string;
  absolute?: boolean;
}) => fg(globs, { cwd: root, absolute });
