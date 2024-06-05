import { RootState } from './store';

export const missionsSelector = (state: RootState) => state.missions.missions;
export const jobsSelector = (state: RootState) => state.missions.jobs;
export const destinationsSelector = (state: RootState) => state.missions.destinations;
