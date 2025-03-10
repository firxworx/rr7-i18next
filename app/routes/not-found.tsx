import { data } from 'react-router'
import { NotFoundScreen } from '@/components/layout/error.screens'

export async function loader() {
  return data(null, { status: 404 })
}

export default function NotFound() {
  return <NotFoundScreen />
}
