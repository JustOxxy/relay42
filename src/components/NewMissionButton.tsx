import { Button } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const NewMissionButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/new-mission')} endContent={<FaPlus />}>
      New Mission
    </Button>
  );
};
