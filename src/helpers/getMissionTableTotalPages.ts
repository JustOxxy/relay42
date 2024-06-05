import { Mission } from '../types';

export const getMissionTableTotalPages = (filteredItems: Mission[], rowsPerPage: number) => {
  return Math.ceil(filteredItems.length / rowsPerPage);
};
