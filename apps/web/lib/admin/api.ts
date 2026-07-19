const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export interface AdminEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  thumbnailUrl: string | null
  eventType: string
  registrationUrl: string
  tags: string[]
  featured: boolean
  status: 'pending' | 'approved' | 'rejected'
}

export async function adminLogin(password: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  return res.ok
}

export async function adminSession(): Promise<boolean> {
  const res = await fetch(`${API_URL}/admin/session`, { credentials: 'include' })
  return res.ok
}

export async function adminLogout(): Promise<void> {
  await fetch(`${API_URL}/admin/logout`, { method: 'POST', credentials: 'include' })
}

export async function fetchEventsByStatus(status: AdminEvent['status'] = 'pending'): Promise<AdminEvent[]> {
  const res = await fetch(`${API_URL}/admin/events?status=${status}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch events')
  const data = await res.json()
  return data.events
}

export async function patchEvent(id: string, patch: Partial<AdminEvent>): Promise<AdminEvent> {
  const res = await fetch(`${API_URL}/admin/events/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error('Failed to update event')
  const data = await res.json()
  return data.event
}

export async function approveEvent(id: string): Promise<AdminEvent> {
  const res = await fetch(`${API_URL}/admin/events/${id}/approve`, { method: 'POST', credentials: 'include' })
  if (!res.ok) throw new Error('Failed to approve event')
  const data = await res.json()
  return data.event
}

export async function rejectEvent(id: string): Promise<AdminEvent> {
  const res = await fetch(`${API_URL}/admin/events/${id}/reject`, { method: 'POST', credentials: 'include' })
  if (!res.ok) throw new Error('Failed to reject event')
  const data = await res.json()
  return data.event
}
