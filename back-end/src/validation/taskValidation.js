const z = require('zod');

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    completed: z.boolean().optional()
});

module.exports = { taskSchema };