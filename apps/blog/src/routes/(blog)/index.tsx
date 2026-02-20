import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { type FC, Suspense } from 'react'
import { getBlogs } from '#/api/blog'
import { AchivmentsSection } from '#/components/home/achivments'
import {
  HomePageSection,
  HomePageSectionSkeleton,
} from '#/components/home/blogs'
import {
  HomePageHeroSection,
  HomePageHeroSectionSkeleton,
} from '#/components/home/hero'
import { Main } from '#/components/main'

const HomePageImpl: FC = () => {
  const { data: blogs } = useSuspenseQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })
  return (
    <>
      <HomePageHeroSection topBlogs={blogs} />
      <Main className="py-5">
        <HomePageSection blogs={blogs} />
        <AchivmentsSection
          // TODO! add total blogs
          totalBlogs={`${blogs.length}`}
        />
      </Main>
    </>
  )
}

const HomePage: FC = () => (
  <>
    <Suspense
      fallback={
        <>
          <HomePageHeroSectionSkeleton />
          <Main className="py-5">
            <HomePageSectionSkeleton />
          </Main>
        </>
      }
    >
      <HomePageImpl />
    </Suspense>
  </>
)

const Route = createFileRoute('/(blog)/')({
  component: HomePage,
})

export { Route }
