export type OrderCategory = 'Mugs' | 'Tableware' | 'Planters' | 'Sculpture'
export type OrderStatus = 'queued' | 'in-progress' | 'ready'
export type Studio = { id: string; name: string; neighborhood: string; nextKiln: string; accent: string; orders: Order[] }
export type Order = { id: string; name: string; customer: string; category: OrderCategory; quantity: number; status: OrderStatus; priority: boolean; notes: string }
export type Filters = { query: string; category: OrderCategory | 'all'; status: 'all' | OrderStatus; priorityOnly: boolean }
