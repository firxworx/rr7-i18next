import type { Route } from './+types/home'
import { Welcome } from '../../welcome/welcome'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App (About)' }, { name: 'description', content: 'About Page' }]
}

export default function About() {
  return <div>About Route</div>
}
