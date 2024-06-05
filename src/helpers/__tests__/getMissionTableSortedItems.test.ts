import { MemberType } from '../../types';
import { expect, test } from 'vitest';
import { SortDescriptor } from '@nextui-org/react';
import { getMissionTableSortedItems } from '../getMissionTableSortedItems';

test('returns sorted items', () => {
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
      name: 'Expedition 2021-12',
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

  const sortDescriptor: SortDescriptor = {
    column: 'name',
    direction: 'descending',
  };

  const tableItems = getMissionTableSortedItems(missions, sortDescriptor);
  expect(tableItems).toEqual([
    {
      name: 'Expedition 2021-12',
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
