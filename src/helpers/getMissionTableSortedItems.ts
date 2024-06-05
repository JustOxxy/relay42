import { SortDescriptor } from '@nextui-org/react';
import { Mission } from '../types';

export const getMissionTableSortedItems = (items: Mission[], sortDescriptor: SortDescriptor) => {
  return [...items].sort((a: Mission, b: Mission) => {
    const first = a[sortDescriptor.column as keyof Mission] as string;
    const second = b[sortDescriptor.column as keyof Mission] as string;
    const cmp = first < second ? -1 : first > second ? 1 : 0;

    return sortDescriptor.direction === 'descending' ? -cmp : cmp;
  });
};
