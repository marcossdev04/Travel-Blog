'use client'
import { FunctionComponent } from 'react'
import { DarkModeToggle } from './DarkModeToggle'

export const Footer: FunctionComponent = () => {
  return (
    <section className="mb-12 mt-8 md:mt-16">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © MRCDEV {new Date().getFullYear()}
        </div>
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </section>
  )
}
