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
    <MuiTabs className="bg-primary mb-4 rounded text-white sm:mb-6">
      {tabs.map((tab) => (
        <Link key={tab.href + tab.label} href={tab.href} passHref>
          <Tab label={tab.label} className="text-lg font-semibold leading-4 tracking-wide active:text-white" />
        </Link>
      ))}
    </MuiTabs>
  )
}
