import { describe, expect, it } from 'vitest'
import { filterOrders, orderProgress } from './filters'
import type { Filters, Order } from '../types'
const orders: Order[] = [{ id: '1', name: 'Blue mug', customer: 'Nadia', category: 'Mugs', quantity: 1, status: 'ready', priority: true, notes: 'Gloss' }, { id: '2', name: 'Clay bowl', customer: 'Omar', category: 'Tableware', quantity: 2, status: 'queued', priority: false, notes: 'Speckled' }]
const base: Filters = { query: '', category: 'all', status: 'all', priorityOnly: false }
describe('filterOrders', () => { it('returns all orders by default', () => expect(filterOrders(orders, base)).toHaveLength(2)); it('matches the name and notes query', () => expect(filterOrders(orders, { ...base, query: 'speckled' })[0].id).toBe('2')); it('filters by category', () => expect(filterOrders(orders, { ...base, category: 'Mugs' })[0].id).toBe('1')); it('filters by status', () => expect(filterOrders(orders, { ...base, status: 'queued' })[0].id).toBe('2')); it('filters to priority orders', () => expect(filterOrders(orders, { ...base, priorityOnly: true })[0].id).toBe('1')) })
describe('orderProgress', () => { it('calculates the ready percentage', () => expect(orderProgress(orders)).toEqual({ done: 1, total: 2, percent: 50 })) })
