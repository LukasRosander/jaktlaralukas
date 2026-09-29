import {
  BookOpen,
  BookmarkCheck,
  ChartColumnBig,
  House,
  ListChecks,
  Settings,
  Target,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  /** Shorter label for the cramped mobile bar. */
  shortLabel?: string
  icon: LucideIcon
  /** Included in the mobile bottom bar instead of the "Mer" sheet. */
  primary?: boolean
}

export const navItems: NavItem[] = [
  { to: '/app', label: 'Hem', icon: House, primary: true },
  { to: '/app/teori', label: 'Teori', icon: BookOpen, primary: true },
  { to: '/app/fragor', label: 'Övningsfrågor', shortLabel: 'Frågor', icon: ListChecks, primary: true },
  { to: '/app/prov', label: 'Prov', icon: Target, primary: true },
  { to: '/app/statistik', label: 'Statistik', icon: ChartColumnBig },
  { to: '/app/sparat', label: 'Sparat', icon: BookmarkCheck },
  { to: '/app/framsteg', label: 'Framsteg', icon: Trophy },
  { to: '/app/installningar', label: 'Inställningar', icon: Settings },
]

export const profileNavItem: NavItem = { to: '/app/profil', label: 'Profil', icon: User }

export const mobilePrimaryItems = navItems.filter((item) => item.primary)
export const mobileSecondaryItems = [
  ...navItems.filter((item) => !item.primary),
  profileNavItem,
]
