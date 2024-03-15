import { useCallback, useMemo, useState } from 'react'
import { createId } from '../lib/id'
import { filterOrders } from '../lib/filters'
import { loadStudios, saveStudios } from '../lib/storage'
import type { Filters, Order, OrderStatus, Studio } from '../types'

const initialFilters: Filters = { query: '', category: 'all', status: 'all', priorityOnly: false }

export function useKilnKeeper() {
  const [studios, setStudios] = useState<Studio[]>(loadStudios)
  const [activeStudioId, setActiveStudioId] = useState('studio-mokha')
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const activeStudio = studios.find((studio) => studio.id === activeStudioId) ?? studios[0]
  const visibleOrders = useMemo(() => filterOrders(activeStudio?.orders ?? [], filters), [activeStudio, filters])
  const persist = useCallback((next: Studio[]) => { setStudios(next); saveStudios(next) }, [])
  const updateStudioOrders = useCallback((mutate: (orders: Order[]) => Order[]) => { persist(studios.map((studio) => studio.id === activeStudioId ? { ...studio, orders: mutate(studio.orders) } : studio)) }, [activeStudioId, persist, studios])
  const toggleSelected = useCallback((id: string) => { setSelectedIds((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next }) }, [])
  const setStatusForSelection = useCallback((status: OrderStatus) => { updateStudioOrders((orders) => orders.map((order) => selectedIds.has(order.id) ? { ...order, status } : order)) }, [selectedIds, updateStudioOrders])
  const addOrder = useCallback((order: Omit<Order, 'id'>) => { updateStudioOrders((orders) => [...orders, { ...order, id: createId() }]) }, [updateStudioOrders])
  const setFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => { setFilters((current) => ({ ...current, [key]: value })) }, [])
  return { activeStudio, studios, activeStudioId, filters, visibleOrders, selectedIds, setActiveStudioId, setFilter, toggleSelected, setStatusForSelection, addOrder }
}
