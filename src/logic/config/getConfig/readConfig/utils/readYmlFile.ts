import YAML from 'yaml';

import { readFileAsync } from '../../../../common/readFileAsync';

export const readYmlFile = async ({ filePath }: { filePath: string }) => {
  // check path is for yml file
  if (filePath.slice(-4) !== '.yml')
    throw new Error(`file path point to a .yml file. error: ${filePath}`);

  // get file contents
  const stringContent = await readFileAsync({ filePath });

  // parse the string content into yml
  const content = YAML.parse(stringContent);

  // return the content
  return content;
};
