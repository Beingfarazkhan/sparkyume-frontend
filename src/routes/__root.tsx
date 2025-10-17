import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import Header from '@/components/custom/Header'
import NotFound from '@/components/custom/NotFound'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Share, Explore and Build on the best startup ideas and side hustles'
      },
      {
        title: 'IdeaDrop - Your Idea Hub'
      }
    ]
  }),
  component: () => (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <HeadContent />
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  ),
  notFoundComponent: NotFound
})
