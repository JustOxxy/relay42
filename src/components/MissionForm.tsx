import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { Input, Select, SelectItem, DatePicker, Button, Snippet } from '@nextui-org/react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Mission } from '../types';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MissionMember } from './MissionMember';
import { useDispatch, useSelector } from 'react-redux';
import { addMissionAction, updateMission } from '../redux/reducer';
import { destinationsSelector } from '../redux/selectors';
import { MissionFormSchema, missionSchema } from '../schemas/missionSchema';

interface MissionFormProps {
  mission?: Mission;
}

export const MissionForm: React.FC<MissionFormProps> = ({ mission }) => {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const dispatch = useDispatch();
  const destinations = useSelector(destinationsSelector);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MissionFormSchema>({
    defaultValues: {
      name: '',
      destination: '',
      departure: today(getLocalTimeZone()).toString(),
      members: [],
    },
    resolver: zodResolver(missionSchema),
  });

  const { members } = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  useEffect(() => {
    if (!mission) return;
    reset({
      name: mission?.name,
      members: mission?.members,
      departure: mission?.departure ? parseDate(mission.departure).toString() : today(getLocalTimeZone()).toString(),
      destination: mission?.destination,
    });
  }, [mission, reset]);

  const onSubmit: SubmitHandler<MissionFormSchema> = (data) => {
    const preparedData = {
      ...data,
      departure: data.departure ? data.departure.toString() : '',
    };

    if (missionId && mission) {
      dispatch(updateMission({ ...preparedData, id: mission.id }));
    } else {
      dispatch(addMissionAction({ ...preparedData, id: uuidv4() }));
    }

    navigate('/');
  };

  const saveButtonText = useMemo(() => {
    if (missionId) return 'Save';

    return 'Create';
  }, [missionId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Name"
              labelPlacement="outside"
              placeholder="Enter expedition name"
              variant="bordered"
              isRequired
              isInvalid={!!fieldState.error}
              classNames={{
                inputWrapper: 'mt-auto',
              }}
            />
          )}
        />
        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelPlacement="outside"
              label="Destination"
              placeholder="Select destination"
              variant="bordered"
              selectedKeys={[field.value ?? '']}
            >
              {destinations.map((destination) => (
                <SelectItem key={destination}>{destination}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="departure"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              labelPlacement="outside"
              label="Departure"
              variant="bordered"
              isRequired
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              onChange={(e) => setValue('departure', e.toString())}
              value={field.value ? parseDate(field.value) : today(getLocalTimeZone())}
            />
          )}
        />
      </div>
      <div className="my-4 rounded-lg bg-content1 p-4 shadow">
        <div className="font-semibold dark:text-white">Members</div>
        <div className="pb-4">
          {fields.map((member, index) => (
            <MissionMember key={member.id} index={index} control={control} remove={remove} members={members} />
          ))}
        </div>
        <Button onClick={() => append({ type: null, experience: '', wealth: '', age: '' })}>New Member</Button>
      </div>
      {errors?.members && (
        <Snippet hideCopyButton hideSymbol color="danger">
          {errors.members?.root?.message}
        </Snippet>
      )}
      <div className="flex flex-row-reverse">
        <Button type="submit">{saveButtonText}</Button>
      </div>
    </form>
  );
};
