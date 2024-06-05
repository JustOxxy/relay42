import { Select, SelectItem, Input, Divider } from '@nextui-org/react';
import { Control, Controller, UseFieldArrayRemove } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { Member, MemberType } from '../types';
import { useSelector } from 'react-redux';
import { jobsSelector } from '../redux/selectors';
import { MissionFormSchema } from '../schemas/missionSchema';

interface MissionMemberProps {
  index: number;
  control: Control<MissionFormSchema>;
  members: Member[];
  remove: UseFieldArrayRemove;
}

export const MissionMember: React.FC<MissionMemberProps> = ({ index, control, members, remove }) => {
  const jobs = useSelector(jobsSelector);

  return (
    <>
      <div className="flex justify-between">
        <div className="grid grid-cols-3 gap-4 py-4">
          <Controller
            name={`members.${index}.type`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Type"
                labelPlacement="outside"
                placeholder="Select member type"
                variant="bordered"
                value={field.value ?? undefined}
                selectedKeys={[field.value || '']}
              >
                <SelectItem key={MemberType.Engineer}>{MemberType.Engineer}</SelectItem>
                <SelectItem key={MemberType.Pilot}>{MemberType.Pilot}</SelectItem>
                <SelectItem key={MemberType.Passenger}>{MemberType.Passenger}</SelectItem>
              </Select>
            )}
          />
          {(members?.[index].type === MemberType.Engineer || members?.[index].type === MemberType.Pilot) && (
            <>
              <Controller
                name={`members.${index}.experience`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Experience"
                    labelPlacement="outside"
                    placeholder="Enter experience"
                    variant="bordered"
                    type="number"
                    min={0}
                  />
                )}
              />
              {members?.[index].type !== MemberType.Pilot && (
                <Controller
                  name={`members.${index}.job`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelPlacement="outside"
                      label="Job"
                      placeholder="Select job"
                      variant="bordered"
                      selectedKeys={[field.value || '']}
                    >
                      {jobs.map((job) => (
                        <SelectItem key={job}>{job}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              )}
            </>
          )}
          {members?.[index].type === MemberType.Passenger && (
            <>
              <Controller
                name={`members.${index}.age`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Age"
                    labelPlacement="outside"
                    placeholder="Enter age"
                    variant="bordered"
                    type="number"
                    min={0}
                  />
                )}
              />
              <Controller
                name={`members.${index}.wealth`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Wealth"
                    labelPlacement="outside"
                    placeholder="Enter wealth info"
                    variant="bordered"
                  />
                )}
              />
            </>
          )}
        </div>
        <span
          className="flex cursor-pointer items-center text-lg text-default-400 hover:text-default-500 active:opacity-50"
          onClick={() => remove(index)}
        >
          <FaTimes />
        </span>
      </div>
      <Divider />
    </>
  );
};
