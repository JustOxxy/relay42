import { MemberType } from '../../types';
import { getMissionTableFilteredItems } from '../getMissionTableFilteredItems';
import { expect, test } from 'vitest';

test('returns filtered items', () => {
  const missions = [
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
      ],
      destination: 'Mars Alpha-116',
      departure: '2021-11-21',
      id: '123123',
    },
    {
      name: 'Expedition 2021-11',
      members: [
        {
          type: MemberType.Pilot,
          experience: '1',
          id: '1',
        },
        {
          type: MemberType.Passenger,
          age: '25',
          wealth: '',
          id: '3',
        },
      ],
      destination: 'Mars Alpha-220',
      departure: '2021-11-21',
      id: '123',
    },
  ];
  const filterValue = '';
  const destinations = ['Mars Alpha-116', 'Mars Alpha-220'];
  const destinationFilter = ['Mars Alpha-116'];
  const filteredItems = getMissionTableFilteredItems({ missions, filterValue, destinationFilter, destinations });
  expect(filteredItems).toEqual([
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
      ],
      destination: 'Mars Alpha-116',
      departure: '2021-11-21',
      id: '123123',
    },
  ]);
});
