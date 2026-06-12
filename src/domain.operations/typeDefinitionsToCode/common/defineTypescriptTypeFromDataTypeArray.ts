import type { DataType } from '@src/domain.objects';

export const defineTypescriptTypeFromDataTypeArray = ({
  type,
}: {
  type: DataType[];
}) => type.join(' | ');
