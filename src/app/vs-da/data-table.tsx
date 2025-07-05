'use client'

import * as React from 'react'

import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { DatePickVSDA } from './date-pick-vsda'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onSuccess: () => void
    showFromLast: boolean
    setShowFromLast: (value: boolean) => void
    selectedDate: Date | undefined
    setSelectedDate: (date: Date | undefined) => void
    onBulkEdit: (rows: TData[]) => void // ✅ Tambahan props baru
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onSuccess,
    showFromLast,
    setShowFromLast,
    selectedDate,
    setSelectedDate,
    onBulkEdit // ✅ Destructure props
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        state: {
            sorting,
            columnFilters,
            rowSelection
        }
    })

    // ✅ Ambil data yang dipilih dari checkbox
    const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original)

    return (
        <>
            <div className="space-y-3 font-mono">
                {/* Search & Top Controls */}
                <div className="flex flex-col-reverse justify-between gap-6 py-4 md:flex-row md:items-center">
                    <Input
                        placeholder="Filter by name..."
                        value={
                            (table
                                .getColumn('name')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn('name')
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="showLast"
                                checked={showFromLast}
                                onCheckedChange={(checked) =>
                                    setShowFromLast(!!checked)
                                }
                            />
                            <Label htmlFor="showLast">Show From Last</Label>
                        </div>
                        <DatePickVSDA
                            value={selectedDate}
                            onChange={setSelectedDate}
                        />
                    </div>
                </div>

                {/* Table UI */}
                <div className="overflow-x-auto rounded-md border font-mono">
                    <Table className="w-full table-fixed">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: header.getSize() }}
                                            className="group relative"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                            {header.column.getCanResize() && (
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent transition group-hover:bg-blue-400"
                                                />
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* ✅ Tombol bulk edit */}
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => onBulkEdit(selectedRows)}
                            disabled={selectedRows.length === 0}
                        >
                            Edit Selected
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
