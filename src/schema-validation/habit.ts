import { z } from 'zod'

export const createHabitSchema = z.object({
    name: z.string().min(1, 'Habit name is required').max(100, 'Name too long'),
    description: z.string().optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly'] as const, {
        message: 'Frequency must be daily, weekly, or monthly',
    }),
    targetCount: z.number().int().positive().optional().default(1),
    isActive: z.boolean().optional(),
    tagIds: z.array(z.uuid()).optional(),
})

export const updateHabitSchema = z.object({
    name: z.string().min(1, 'Habit name is required').max(100, 'Name too long'),
    description: z.string().optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
    targetCount: z.number().int().positive().optional(),
    isActive: z.boolean().optional(),
    tagIds: z.array(z.uuid()).optional(),
})

export const uuidSchema = z.object({
    id: z.uuid({ message: 'Invalid habit ID format' }),
})
