import { DataType } from '../../../model';

export const defineTypescriptTypeFromDataTypeArray = ({ type }: { type: DataType[] }) => type.join(' | ');
