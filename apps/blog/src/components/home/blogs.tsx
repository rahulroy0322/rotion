import { Link } from '@tanstack/react-router'
import { type FC, Fragment, useMemo } from 'react'
import type { BlogType } from 'schema/blog'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'ui/ui/pagination'
import { BlogCard, BlogCardSkeleton } from './blogCard'

const desc =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quidem consequatur est quaerat exercitationem officiis at itaque vero totam odio possimus placeat ut explicabo distinctio id'

type PaginationType =
  | {
      page: number
    }
  | {
      elepsis: true
    }

type HomePagePaginationsPropsType = {
  pages: number
  currentPage: number
}

const HomePagePaginations: FC<HomePagePaginationsPropsType> = ({
  pages,
  currentPage,
}) => {
  const paginations = useMemo((): PaginationType[] => {
    if (pages < 6) {
      return Array.from(
        {
          length: pages,
        },
        (_, i) =>
          ({
            page: i + 1,
          }) satisfies PaginationType
      )
    }

    const isCuurentElepsis = currentPage > 2 && currentPage < pages - 1

    if (isCuurentElepsis) {
      return [
        {
          elepsis: true,
        },
        {
          page: currentPage - 1,
        },
        {
          page: currentPage,
        },
        {
          elepsis: true,
        },
        {
          page: pages,
        },
      ]
    }

    return [
      {
        page: 1,
      },
      {
        page: 2,
      },
      {
        elepsis: true,
      },
      {
        page: pages - 1,
      },
      {
        page: pages,
      },
    ]
  }, [pages, currentPage])

  console.assert(
    paginations.length < 6,
    'some event does not handled properly as paginations is too big',
    paginations
  )

  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            nativeButton={false}
            render={
              <Link
                disabled={currentPage === 1}
                to="/"
              />
            }
          />
        </PaginationItem>

        {paginations.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: i take res
          <Fragment key={i}>
            {'page' in item ? (
              <PaginationItem>
                <PaginationLink
                  isActive={item.page === currentPage}
                  nativeButton={false}
                  render={<Link to="/" />}
                >
                  {item.page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </Fragment>
        ))}

        <PaginationItem>
          <PaginationNext
            nativeButton={false}
            render={
              <Link
                disabled={currentPage === pages}
                to="/"
              />
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

type HomePageSectionPropsType = {
  blogs: BlogType[]
} & HomePagePaginationsPropsType

const HomePageSection: FC<HomePageSectionPropsType> = ({
  blogs,
  pages,
  currentPage,
}) => (
  <section className="container p-2">
    <h2 className="text-xl font-bold">Blogs</h2>
    <h3 className="line-clamp-1">{desc}</h3>

    <div className="my-6">filters</div>

    <ul className="grid md:grid-cols-3 gap-6">
      {blogs.map(
        (
          {
            // images,
            // author: { name, avatar },
            // desc,
            title,
            time,
            slug,
          },
          i
        ) => (
          <li key={slug || i}>
            <BlogCard
              // alt={images[0].alt}
              avatarUrl={'/avatar.webp'}
              desc={desc}
              heroImage={'/write.jpg'}
              // name={name}
              name="bxaksjkan"
              slug={slug}
              time={time || ''}
              title={title}
            />
          </li>
        )
      )}
    </ul>

    <HomePagePaginations
      currentPage={currentPage}
      pages={pages}
    />
  </section>
)

const HomePageSectionSkeleton: FC = () => (
  <section className="container p-2">
    <h2 className="text-xl font-bold">Blogs</h2>
    <h3 className="line-clamp-1">{desc}</h3>

    {/* 
// TODO!
*/}
    <div className="my-6">filters</div>

    <ul className="grid md:grid-cols-3 gap-6">
      {Array.from(
        {
          length: 3,
        },
        (_, i) => (
          <li key={`${i.toString()}`}>
            <BlogCardSkeleton />
          </li>
        )
      )}
    </ul>
  </section>
)

export { HomePageSection, HomePageSectionSkeleton }
