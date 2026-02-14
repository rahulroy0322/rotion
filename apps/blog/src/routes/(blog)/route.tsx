import { MainFooter } from '#/components/footer'
import { MainHeader } from '#/components/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'


const BlogLayout:FC = ()=> <>
<MainHeader/>
<Outlet/>
<MainFooter/>
</>


const Route = createFileRoute('/(blog)')({
  component: BlogLayout,
})



export {
  Route
}
