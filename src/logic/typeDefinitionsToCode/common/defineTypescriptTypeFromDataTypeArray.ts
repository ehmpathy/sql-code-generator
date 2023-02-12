import { DataType } from '../../../domain';

export const defineTypescriptTypeFromDataTypeArray = ({
  type,
}: {
  type: DataType[];
}) => type.join(' | ');
