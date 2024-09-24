'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { config } from '@/config'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent } from 'react'
interface MenuItem {
  name: string
  href: string
  openInNewTab?: boolean
}
const menuItems: MenuItem[] = [
  { name: 'Blog', href: '/' },
  { name: 'About', href: '/about' },
]
export const Navigation: FunctionComponent = () => {
  const pathname = usePathname()

  return (
    <nav>
      <div className="hidden items-center md:flex">
        {menuItems.map((item) => (
          <div key={item.href} className="ml-4 md:ml-8">
            <a
              href={item.href}
              target={item.openInNewTab ? '_blank' : '_self'}
              className={cn(
                'hover:text-gray-900',
                pathname === item.href && 'font-semibold',
              )}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size="24" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : '_self'}
                    className={cn(
                      'block py-2',
                      pathname === item.href && 'font-semibold',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export const Header: FunctionComponent = () => {
  return (
    <section className="mb-12 mt-8 flex items-center justify-between md:mt-16">
      <Link href="/">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
          {config.blog.name}
        </h1>
      </Link>
      <Navigation />
    </section>
  )
}
