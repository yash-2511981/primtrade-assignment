const z = require('zod');

const updateTaskSchema = z.object({
    taskId: z.string().min(1, 'Task ID is required'),
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    completed: z.boolean().optional()
});

module.exports = { updateTaskSchema };