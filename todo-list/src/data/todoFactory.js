/**
 * Factory function to create a new Todo object.
 * Returns a POJO (Plain Old JavaScript Object) with no methods.
 */
export const todoFactory = ({
  title,
  description = '',
  dueDate = '',
  priority = 'none',
  notes = '',
  checklist = [],
  completed = false,
  status = 'todo',
}) => {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed,
    status,
  };
};
