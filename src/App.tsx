import { AddOrderForm } from './components/AddOrderForm'
import { BulkActions } from './components/BulkActions'
import { FilterBar } from './components/FilterBar'
import { OrderTable } from './components/OrderTable'
import { ProgressCard } from './components/ProgressCard'
import { StudioSwitcher } from './components/StudioSwitcher'
import { useKilnKeeper } from './hooks/useKilnKeeper'
import './App.css'

export default function App() { const app = useKilnKeeper(); const studio = app.activeStudio; if (!studio) return <main className="app-shell"><p>No studio found.</p></main>; return <main className="app-shell"><header className="topbar"><a className="brand" href="/" aria-label="KilnKeeper home"><span className="brand-mark">K</span><span>KilnKeeper</span></a><nav aria-label="Primary navigation"><a className="active" href="#orders">Orders</a><a href="#calendar">Kiln calendar</a><a href="#studio">Studio settings</a></nav><StudioSwitcher studios={app.studios} activeId={app.activeStudioId} onChange={app.setActiveStudioId} /><button className="avatar" aria-label="Open profile menu">YS</button></header><div className="page-content"><section className="hero"><div><p className="eyebrow">Good morning, Youssef <span className="sun">✦</span></p><h1>{studio.name}</h1><p className="hero-meta">{studio.neighborhood} <span>•</span> Next kiln {studio.nextKiln}</p></div><AddOrderForm onAdd={app.addOrder} /></section><ProgressCard orders={studio.orders} /><FilterBar filters={app.filters} onChange={app.setFilter} /><BulkActions count={app.selectedIds.size} onMark={app.setStatusForSelection} /><OrderTable orders={app.visibleOrders} selectedIds={app.selectedIds} onToggle={app.toggleSelected} /><div className="sr-only" role="status" aria-live="polite">{app.selectedIds.size} orders selected. {app.visibleOrders.length} orders visible.</div><footer><span>Last saved locally just now</span><span>·</span><span>All times in Cairo</span></footer></div></main> }
