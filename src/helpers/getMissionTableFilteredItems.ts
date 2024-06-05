import { MissionTableFilteredItemsParams } from '../types';

export const getMissionTableFilteredItems = ({
  missions,
  filterValue,
  destinationFilter,
  destinations,
}: MissionTableFilteredItemsParams) => {
  let filteredMissions = [...missions];
  const hasSearchFilter = Boolean(filterValue);

  if (hasSearchFilter) {
    filteredMissions = filteredMissions.filter((mission) =>
      mission.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }
  if (destinationFilter !== 'all' && destinationFilter.length !== destinations.length) {
    filteredMissions = filteredMissions.filter(
      (mission) => mission.destination && destinationFilter.includes(mission.destination),
    );
  }

  return filteredMissions;
};
