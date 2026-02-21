import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { type FC, Suspense } from 'react'
import { blogsSearchSchema } from 'schema/search'
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
import { KEYS } from '#/keys/query'

const HomePageImpl: FC = () => {
  const search = useSearch({
    from: '/(blog)/',
  })

  const parsed = blogsSearchSchema.safeParse(search)

  // biome-ignore lint/style/noNonNullAssertion: trust me
  const { page } = parsed.data!

  const {
    data: {
      blogs,
      items: { pages, total },
    },
  } = useSuspenseQuery({
    queryKey: [...KEYS.blogs, search],
    queryFn: () => getBlogs(parsed.data),
  })

  return (
    <>
      <HomePageHeroSection topBlogs={blogs} />
      <Main className="py-5">
        <HomePageSection
          blogs={blogs}
          currentPage={page}
          pages={pages}
        />
        <AchivmentsSection totalBlogs={`${total - 1}+`} />
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
