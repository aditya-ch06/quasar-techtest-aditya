export interface Outlet {
  id: number
  name: string
  location: string
  status: string
  userId: number
  salesName?: string 
  total: number
}

export interface User {
  id: number
  name: string
  role: string
  password: string
  username: string
}

export interface Order {
  id: number
  orderDate: string
  outletId: number
}