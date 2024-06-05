export interface Mission {
  name: string;
  id: string;
  members: Member[];
  destination?: string;
  departure: string;
}

export interface Member {
  id?: string;
  type?: MemberType | null;
  experience?: string;
  job?: string;
  age?: string;
  wealth?: string;
}

export enum MemberType {
  Pilot = 'Pilot',
  Engineer = 'Engineer',
  Passenger = 'Passenger',
}

export interface MissionTableFilteredItemsParams {
  missions: Mission[];
  filterValue: string;
  destinationFilter: string[] | 'all';
  destinations: string[];
}
