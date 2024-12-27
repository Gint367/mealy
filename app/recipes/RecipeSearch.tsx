'use client'
import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
    getFilteredRowModel,
} from '@tanstack/react-table';
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from '@/components/ui/button';

interface Recipe {
    id: string;
    title: string;
}

interface RecipeSearchProps {
    recipes: Recipe[];
}

const columnHelper = createColumnHelper<Recipe>();

const columns = [
    columnHelper.accessor('title', {
        header: 'Title',
        cell: info => (
            <Link href={`/recipes/${info.row.original.id}`} className="block p-4 my-1 transition-colors duration-200 ease-in-out bg-card hover:bg-primary/10 group-hover:text-primary border rounded-lg">
                {info.getValue()}
            </Link>
        ),
        enableSorting: true,
    }),
];

export default function RecipeSearch({ recipes }: RecipeSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const table = useReactTable({
        data: recipes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: 'title', desc: false }],
        },
        globalFilterFn: (row, columnId, filterValue) => {
            return row.original.title.toLowerCase().includes(filterValue.toLowerCase());
        },
    });

    return (
        <div>
            <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    table.setGlobalFilter(e.target.value);
                }}
                className="mb-4 border focus:ring-primary focus:outline-none"
            />
            {table.getRowModel().rows.length > 0 ? (
                <div>
                    <Table className="min-w-full">
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="flex items-center px-6 pb-2 border-b text-left text-xs font-medium text-muted-foreground uppercase"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === 'desc' ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 96 960 960" width="12"><path d="M480 936 240 696l56-56 144 144V256h80v528l144-144 56 56-240 240Z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 96 960 960" width="12" style={{ transform: 'rotate(180deg)' }}><path d="M480 936 240 696l56-56 144 144V256h80v528l144-144 56 56-240 240Z" /></svg>
                                                )
                                            ) : ''}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className=" ">
                            {table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-6 py-2 whitespace-nowrap text-nowrap"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'<<'}
                            </Button>
                            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'<'}
                            </Button>
                            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'>'}
                            </Button>
                            <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'>>'}
                            </Button>
                        </div>
                        <span className="text-sm">
                            Page{' '}
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </strong>
                        </span>
                        <span className="flex items-center space-x-2">
                            <span>Go to page:</span>
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className="w-16 p-1 border rounded"
                            />
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value));
                            }}
                            className="p-1 border rounded"
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted-foreground">No recipes found matching your search.</p>
            )}
        </div>
    );
}