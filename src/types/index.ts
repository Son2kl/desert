export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  priceUnit?: string
  volume?: string
  tag?: string
  image?: string
}

export interface MenuCategory {
  id: string
  name: string
  emoji: string
  items: MenuItem[]
}

export interface MenuData {
  categories: MenuCategory[]
}

export interface Review {
  id: string
  name: string
  date: string
  rating: number
  text: string
  avatar?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  span?: 'normal' | 'wide' | 'tall'
}
