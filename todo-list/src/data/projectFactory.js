/**
 * Factory function to create a new Project object.
 * Returns a POJO (Plain Old JavaScript Object) with no methods.
 */
export const projectFactory = (title) => {
  return {
    id: crypto.randomUUID(),
    title,
    todos: [],
  };
};
