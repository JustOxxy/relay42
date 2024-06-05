import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MemberType, Mission } from '../types';
import { MissionState } from './types';

const missionsInitialState: MissionState = {
  missions: [
    {
      name: 'Expedition 2021-11',
      members: [
        {
          type: MemberType.Pilot,
          experience: '1',
          id: '1',
        },
        {
          type: MemberType.Pilot,
          experience: '5',
          job: '',
          id: '2',
        },
        {
          type: MemberType.Passenger,
          age: '25',
          wealth: '',
          id: '3',
        },
        {
          type: MemberType.Pilot,
          experience: '5',
          job: '',
          id: '4',
        },
        {
          type: MemberType.Passenger,
          age: '25',
          wealth: '',
          id: '5',
        },
      ],
      destination: 'Mars Alpha-116',
      departure: '2021-11-21',
      id: '123123',
    },
    {
      name: 'Expedition 2021-10',
      members: [
        {
          type: MemberType.Pilot,
          experience: '1',
          id: '1',
        },
        {
          type: MemberType.Pilot,
          experience: '5',
          job: '',
          id: '2',
        },
      ],
      destination: 'Mars Alpha-220',
      departure: '2021-10-18',
      id: '123',
    },
    {
      name: 'Expedition 2022-05',
      members: [
        {
          type: MemberType.Pilot,
          experience: '5',
          job: '',
          id: '2',
        },
      ],
      destination: 'Mars Alpha-116',
      departure: '2022-05-15',
      id: '12',
    },
  ],
  jobs: ['Navigation', 'Solar panels', 'Maintenance', 'Mechanics'],
  destinations: ['Mars Alpha-116', 'Mars Alpha-220', 'Mars Alpha-224', 'Mars Alpha-110'],
};

export const missionsSlice = createSlice({
  name: 'missions',
  initialState: missionsInitialState,
  reducers: {
    addMissionAction: (state: MissionState, { payload: mission }: PayloadAction<Mission>) => {
      const newMissions = [...state.missions];
      newMissions.push(mission);
      state.missions = newMissions;
    },
    updateMission: (state: MissionState, { payload: mission }: PayloadAction<Mission>) => {
      const updatedMissions = [...state.missions];
      const targetMission = updatedMissions.findIndex((item) => item.id === mission.id);

      if (targetMission !== -1) {
        updatedMissions[targetMission] = mission;
        state.missions = updatedMissions;
      }
    },
  },
});

export const { addMissionAction, updateMission } = missionsSlice.actions;

export default missionsSlice.reducer;
