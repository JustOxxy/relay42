import { differenceInCalendarDays, format, differenceInCalendarMonths } from 'date-fns';
import { useMemo, useState, useEffect } from 'react';

const INTERVAL_DURATION = 600000;

export const MissionDeparture: React.FC<{ departure: string }> = ({ departure }) => {
  const today = useMemo(() => new Date(), []);

  const [departureDiff, setDepartureDiff] = useState(differenceInCalendarDays(departure, today));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDepartureDiff(differenceInCalendarDays(departure, new Date()));
    }, INTERVAL_DURATION);

    return () => {
      clearInterval(intervalId);
    };
  }, [departure]);

  return (
    <div className="flex flex-col">
      {format(departure, 'dd/MM/yyyy')}
      <div>
        {(() => {
          if (departureDiff > 0) {
            if (departureDiff > 50) {
              return (
                <div className="text-xs italic">{`In ${differenceInCalendarMonths(new Date(departure), today)} months`}</div>
              );
            }
            return <div className="text-xs italic">{`In ${departureDiff} days`}</div>;
          }

          if (departureDiff === 0) {
            return <div className="text-xs italic">Today</div>;
          }

          if (departureDiff < 0) {
            return <div className="text-xs italic text-red-600">Departed</div>;
          }
        })()}
      </div>
    </div>
  );
};
