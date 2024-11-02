import { z } from 'zod';
import validator from "validator";

export const UserInfoSchema = z.object({
    firstName: z.string().min(2).max(191),
    lastName: z.string().min(2).max(191),
    phonenumber: z.string().refine(validator.isMobilePhone),
    building: z.number().min(5).max(11),
    apartment: z.number().min(1).max(55),
    requested_gateId: z.number(),
});
