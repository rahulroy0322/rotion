'use no memo'
import {
  DotsThreeVerticalIcon,
  EyeIcon,
  PencilIcon,
} from '@phosphor-icons/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { type FC, useState } from 'react'
import type { BlogStatusType, BlogType } from 'schema/blog'
import {
  type ColumnDef,
  type ColumnFiltersState,
  DataTable,
  DataTableColumnHeader,
  DataTableFooter,
  DataTableHeader,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  useReactTable,
} from 'ui/components/app/data.table.tsx'
import { Badge } from 'ui/ui/badge'
import { Button } from 'ui/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from 'ui/ui/card'
import { Checkbox } from 'ui/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from 'ui/ui/popover'
import { getBlogs } from '#/api/blog'
import { Loading } from '#/components/loading'
import { KEYS } from '#/keys/query'
import { timeFormat } from '#/utils/time'

type BlogKeyType = keyof BlogType

const columns: ColumnDef<BlogType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsSomePageRowsSelected() ||
            table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'title' satisfies BlogKeyType,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-w-30"
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 max-w-30">
        {row.getValue('title' satisfies BlogKeyType)}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: 'time' satisfies BlogKeyType,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-fit"
        column={column}
        title="When?"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {timeFormat(row.getValue('time' satisfies BlogKeyType))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    // filterFn: 'inDateRange' as 'weakEquals',
  },
  {
    accessorKey: 'status' satisfies BlogKeyType,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status: BlogStatusType = row.getValue(
        'status' satisfies BlogKeyType
      )
      return (
        <div className="flex items-center justify-center">
          <Badge variant={status === 'published' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
      />
    ),
    cell: ({
      row: {
        original: { slug },
      },
    }) => (
      <div className="flex items-center justify-end">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                size="sm"
                variant="ghost"
              />
            }
          >
            <DotsThreeVerticalIcon />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="flex-row w-fit gap-1 shadow shadow-primary"
          >
            <Button
              nativeButton={false}
              render={
                <Link
                  params={{
                    slug,
                  }}
                  to="/blog/$slug"
                />
              }
              size={'icon-sm'}
              variant={'ghost'}
            >
              <EyeIcon />
            </Button>
            <Button
              nativeButton={false}
              render={
                <Link
                  params={{
                    slug,
                  }}
                  to="/admin/blog/edit/$slug"
                />
              }
              size={'icon-sm'}
            >
              <PencilIcon />
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

type ManagePageImplPropsType = {
  data: BlogType[]
  pages: number
  total: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
}

const ManagePageImpl: FC<ManagePageImplPropsType> = ({
  data,
  pages,
  pagination,
  onPaginationChange,
}) => {
  const [sorting, onSortingChange] = useState<SortingState>([])
  const [globalFilter, onGlobalFilterChange] = useState('')
  const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable<BlogType>({
    data,
    columns,
    enableRowSelection: (row) => !!row.original._id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange,
    manualPagination: true,
    onPaginationChange,
    pageCount: pages,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination,
    },
    // filterFns: {
    //   inDateRange,
    // },
    onColumnFiltersChange,
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="grow overflow-hidden p-2">
      <Card className="shadow h-full flex flex-col">
        <CardHeader>
          <DataTableHeader
            search={globalFilter}
            setSearch={onGlobalFilterChange}
            table={table}
          />
        </CardHeader>
        <CardContent className="grow overflow-auto relative">
          <DataTable table={table} />
        </CardContent>
        <CardFooter>
          <DataTableFooter table={table} />
        </CardFooter>
      </Card>
    </div>
  )
}

const ManagePage: FC = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { error, isLoading, data } = useQuery({
    queryKey: [...KEYS.blogs, pagination],
    queryFn: () =>
      getBlogs({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
    placeholderData: keepPreviousData,
  })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('blogs is not defined')
  }

  const {
    blogs,
    items: { pages, total },
  } = data

  return (
    <ManagePageImpl
      data={blogs}
      onPaginationChange={setPagination}
      pages={pages}
      pagination={pagination}
      total={total}
    />
  )
}

const Route = createFileRoute('/admin/blog/manage')({
  component: ManagePage,
})

export { Route }
