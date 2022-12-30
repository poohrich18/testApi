export const siteSettings = (id: string) => ({
  tabsNavigation: {
    menu: [
      {
        href: `/${id}/show-detail`,
        label: 'Detail',
      },
      {
        href: `/${id}/show-test-detail`,
        label: 'Test',
      },
    ],
  },
})
