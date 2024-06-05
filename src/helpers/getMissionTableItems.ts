import { Mission } from '../types';

export const getMissionTableItems = (page: number, rowsPerPage: number, filteredItems: Mission[]) => {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  return filteredItems.slice(start, end);
};
