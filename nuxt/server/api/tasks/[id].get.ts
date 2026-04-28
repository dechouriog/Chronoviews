import { tasks } from '../../data/tasks'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const task = tasks.find(t => t.id === id)

  if (!task) {
    throw createError({ statusCode: 404, message: 'Task not found' })
  }

  return task
})