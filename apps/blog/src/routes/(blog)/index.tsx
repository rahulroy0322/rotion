import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import { AchivmentsSection } from '#/components/home/achivments'

import { HomePageSection } from '#/components/home/blogs'
import { HomePageHeroSection } from '#/components/home/hero'
import { Main } from '#/components/main'
import type { BlogType, CategoryType } from '#/types'

const desc =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quidem consequatur est quaerat exercitationem officiis at itaque vero totam odio possimus placeat ut explicabo distinctio id'

const time = new Date()

const categories = [
  {
    _id: '1',
    name: 'web dev',
  },
  {
    _id: '2',
    name: 'basic',
  },
  {
    _id: '3',
    name: 'web dev',
  },
  {
    _id: '4',
    name: 'basic',
  },
  {
    _id: '5',
    name: 'basic',
  },
] as const satisfies CategoryType[]

const topBlogs = [
  {
    _id: '1',
    title: "Let's learn js basic.",
    slug: 'let-learn-js-basic',
    desc,
    images: [
      {
        url: '/write.jpg',
      },
    ],
    author: {
      name: 'Author Name',
      avatar: '/avatar.webp',
    },
    time,
    categories,
  },
  {
    _id: '2',
    title: "Let's learn ts basic.",
    slug: 'let-learn-ts-basic',
    desc,
    images: [
      {
        url: '/avatar.webp',
      },
    ],
    author: {
      name: 'Author Name',
      avatar: '/write.jpg',
    },
    time,
    categories,
  },
] as BlogType[] satisfies BlogType[]

const blogs = topBlogs

const HomePage: FC = () => (
  <>
    <HomePageHeroSection topBlogs={topBlogs} />
    <Main className="py-5">
      <HomePageSection blogs={blogs} />
      <AchivmentsSection totalBlogs={'100+'} />
    </Main>
  </>
)

const Route = createFileRoute('/(blog)/')({
  component: HomePage,
})

export { Route }
