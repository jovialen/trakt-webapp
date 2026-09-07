export type Feed = { id: number; name: string; link: string; groups: number[]; unread: number }

export type Group = { id: number; name: string }

export type Article = {
  id: string
  title: string
  link: string
  summary: string
  published_at: string
  updated_at: string
  authors: string
  categories: string
  feed_id: number
  read_at: string
  read_later: boolean
  saved_at: string
}
