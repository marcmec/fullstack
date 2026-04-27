'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')
  
  return (
    <Link 
      href={href}
      className={`px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted'
      }`}
    >
      {children}
    </Link>
  )
}