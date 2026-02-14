import type { FC } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'ui/ui/pagination'
import type { BlogType } from '#/types'
import { BlogCard } from './blogCard'

type HomePageSectionPropsType = {
  blogs: BlogType[]
}

const desc =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quidem consequatur est quaerat exercitationem officiis at itaque vero totam odio possimus placeat ut explicabo distinctio id'

const HomePageSection: FC<HomePageSectionPropsType> = ({ blogs }) => (
  <section className="container p-2">
    <h2 className="text-xl font-bold">Blogs</h2>
    <h3 className="line-clamp-1">{desc}</h3>

    <div className="my-6">filters</div>

    <ul className="grid md:grid-cols-3 gap-6">
      {blogs.map(
        ({
          _id,
          images,
          author: { name, avatar },
          desc,
          title,
          time,
          slug,
        }) => (
          <li key={_id}>
            <BlogCard
              alt={images[0].alt}
              avatarUrl={avatar}
              desc={desc}
              heroImage={images[0].url}
              name={name}
              slug={slug}
              time={time}
              title={title}
            />
          </li>
        )
      )}
    </ul>

    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size={undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size={undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            size={undefined}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size={undefined}
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            size={undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </section>
)

export { HomePageSection }
