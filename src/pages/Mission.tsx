import { MissionTable } from '../components/table/MissionTable';
import { NewMissionButton } from '../components/NewMissionButton';

export const Mission = () => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-default-100">
      <div className="md container">
        <div className="flex items-center justify-between py-4">
          <div className="font-semibold dark:text-white">Mission</div>
          <NewMissionButton />
        </div>

        <MissionTable />
      </div>
    </div>
  );
};
