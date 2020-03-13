export const defineTypescriptCommonExportsForQueryFunctions = () => {
  return `
// typedefs common to each query function
export type DatabaseExecuteCommand = (args: { sql: string; values: any[] }) => Promise<any[]>;
export type LogMethod = (message: string, metadata: any) => void;
  `.trim();
};
