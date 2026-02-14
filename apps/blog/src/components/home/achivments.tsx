import {
  ArrowRightIcon,
  BookOpenUserIcon,
  TrophyIcon,
} from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'

type AchivmentsSectionPropsType = {
  totalBlogs: string
}

const AchivmentsSection: FC<AchivmentsSectionPropsType> = ({ totalBlogs }) => (
  <section className="grid p-2 gap-4 *:ring md:grid-cols-2 lg:grid-cols-3 *:bg-card *:shadow *:shadow-primary">
    <div className="p-4">
      <span className="size-8 p-1 ring inline-block">
        <BookOpenUserIcon />
      </span>
      <h3 className="text-xl font-bold text-pretty w-3/4 mt-5">
        Explore More To Get Comfortable with{' '}
        <span className="text-primary text-nowrap">JS & TS</span>
      </h3>
      <h4 className="text-base font-medium text-muted-foreground w-3/4 text-balance mb-5 mt-2">
        Explore the site learn more about JavaScript Ecosystem
      </h4>
      <Link
        className=""
        to="/"
      >
        <Button className="group/cta">
          Lets Continue{' '}
          <ArrowRightIcon className="group-hover/cta:ml-2 transition-all duration-300" />
        </Button>
      </Link>
    </div>

    <div className="p-4">
      <span className="size-8 p-1 ring inline-block">
        <TrophyIcon />
      </span>
      <h3 className="text-xl font-bold text-pretty w-3/4 mt-20">
        Available Blogs
      </h3>
      <h4 className="font-extrabold text-3xl mt-2">{totalBlogs}</h4>
    </div>

    <div className="flex items-center justify-center py-20 md:col-span-2 md:py-32 lg:py-[auto] lg:col-start-2 lg:row-start-1 lg:row-span-2">
      <h3 className="text-xl font-bold text-center text-balance w-4/5">
        In This era of ai where ai is coding for you; you have to{' '}
        <span className="text-primary">understand</span> what ai is writings
      </h3>
    </div>
  </section>
)

export { AchivmentsSection }
