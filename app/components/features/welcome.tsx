import type React from 'react'
import { Link } from 'react-router'

import logoDark from '@/components/assets/logo-dark.svg'
import logoLight from '@/components/assets/logo-light.svg'

export function Welcome(): React.JSX.Element {
  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src={logoLight} alt="React Router" className="block w-full dark:hidden" />
            <img src={logoDark} alt="React Router" className="hidden w-full dark:block" />
          </div>
        </header>
      </div>
      <div className="flex justify-ccenter gap-4">
        <ul className="flex flex-col gap-4">
          <li>
            <Link to="/about">about (English)</Link>
          </li>
          <li>
            <Link to="/fr/about">/fr/about (Français)</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
