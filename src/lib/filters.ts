import type { Filters, Order } from '../types'

export function filterOrders(orders: Order[], filters: Filters): Order[] {
  const query = filters.query.trim().toLowerCase()
  return orders.filter((order) => {
    const matchesQuery = !query || [order.name, order.customer, order.notes].some((value) => value.toLowerCase().includes(query))
    const matchesCategory = filters.category === 'all' || order.category === filters.category
    const matchesStatus = filters.status === 'all' || order.status === filters.status
    const matchesPriority = !filters.priorityOnly || order.priority
    return matchesQuery && matchesCategory && matchesStatus && matchesPriority
  })
}

export function orderProgress(orders: Order[]): { done: number; total: number; percent: number } {
  const done = orders.filter((order) => order.status === 'ready').length
  const total = orders.length
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}
