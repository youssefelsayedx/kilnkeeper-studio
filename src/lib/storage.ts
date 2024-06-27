import type { Studio } from '../types'

const STORAGE_KEY = 'kilnkeeper-studios'

export function sampleStudios(): Studio[] {
  return [{ id: 'studio-mokha', name: 'Mokha Clay House', neighborhood: 'Garden City', nextKiln: 'Tomorrow · 09:00', accent: 'terracotta', orders: [
    { id: 'o-101', name: 'Dune breakfast set', customer: 'Noura Hassan', category: 'Tableware', quantity: 12, status: 'in-progress', priority: true, notes: 'Matte sand glaze' },
    { id: 'o-102', name: 'Window herb planters', customer: 'Palm & Pot', category: 'Planters', quantity: 6, status: 'queued', priority: false, notes: 'Drainage holes, small size' },
    { id: 'o-103', name: 'Night market mugs', customer: 'Tarek Samy', category: 'Mugs', quantity: 8, status: 'ready', priority: false, notes: 'Cobalt handles' },
    { id: 'o-104', name: 'Sunbird study', customer: 'Lina Atef', category: 'Sculpture', quantity: 1, status: 'queued', priority: true, notes: 'Fragile wings, hand-build' },
    { id: 'o-105', name: 'Olive serving bowls', customer: 'Nile Table', category: 'Tableware', quantity: 4, status: 'ready', priority: false, notes: 'Food safe liner' },
  ] }]
}

export function loadStudios(): Studio[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return sampleStudios(); const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) ? parsed as Studio[] : sampleStudios() } catch { return sampleStudios() }
}

export function saveStudios(studios: Studio[]): void { localStorage.setItem(STORAGE_KEY, JSON.stringify(studios)) }
