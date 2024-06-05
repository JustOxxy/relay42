import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mission } from '../types';
import { MissionForm } from '../components';
import { useSelector } from 'react-redux';
import { missionsSelector } from '../redux/selectors';

export const MissionDetails = () => {
  const { missionId } = useParams();
  const missions = useSelector(missionsSelector);
  const [mission, setMission] = useState<Mission>();

  useEffect(() => {
    if (!missionId) return;

    const targetMission = missions.find((item) => item.id === missionId);

    if (targetMission) {
      setMission(targetMission);
    }
  }, [missionId, missions]);

  const title = useMemo(() => {
    if (missionId && mission) return `Configure ${mission.name}`;

    return 'Configure a new Mission';
  }, [mission, missionId]);

  return (
    <div className="flex h-full w-full flex-col items-center bg-default-100">
      <div className="md container">
        <div className="py-4 font-semibold dark:text-white">{title}</div>
        <MissionForm mission={mission} />
      </div>
    </div>
  );
};
