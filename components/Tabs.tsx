import { Tabs as MuiTabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import Link from 'next/link'

interface TabProps {
  href: string
  label: string
}

interface TabsProps {
  tabs: TabProps[]
}

export default function Tabs({ tabs }: TabsProps) {
  return (
    <MuiTabs className="bg-slate-100">
      {tabs.map((tab) => (
        <Link key={tab.href + tab.label} href={tab.href} passHref>
          <Tab label={tab.label} className="font-bold tracking-tight" />
        </Link>
      ))}
    </MuiTabs>
  )
}
