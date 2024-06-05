import { z } from 'zod';
import { MemberType } from '../types';

const memberSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(MemberType).nullish(),
  experience: z.string().optional(),
  job: z.string().optional(),
  age: z.string().optional(),
  wealth: z.string().optional(),
});

export const missionSchema = z.object({
  name: z.string().min(1, 'Mission name is required'),
  destination: z.string().optional(),
  departure: z.string(),
  members: z.array(memberSchema).superRefine((members, ctx) => {
    console.log('ghghg');
    // Check for exactly one pilot with at least 10 years of experience
    const pilots = members.filter((member) => member.type === MemberType.Pilot);
    if (pilots.length !== 1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'There must be exactly one pilot', path: ['root'] });
    } else if (!pilots[0].experience) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Pilot must have experience', path: ['root'] });
    } else if (pilots[0].experience && parseInt(pilots[0].experience, 10) < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Pilot must have at least 10 years of experience',

        path: ['root'],
      });
    }

    // Check that all engineers have different jobs
    const engineers = members.filter((member) => member.type === MemberType.Engineer);
    const jobs = new Set(engineers.map((engineer) => engineer.job));
    if (jobs.size !== engineers.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'All engineers must have different jobs',
        path: ['root'],
      });
    }

    // Check for at least one passenger
    const passengers = members.filter((member) => member.type === MemberType.Passenger);
    if (!passengers.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'There must be at least one passenger',
        path: ['root'],
      });
    }
  }),
});

export type MissionFormSchema = z.infer<typeof missionSchema>;
