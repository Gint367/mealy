'use client'
import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { Input } from "@/components/ui/input";
import Link from 'next/link';

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
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        setFilteredRecipes(
            recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const table = useReactTable({
        data: filteredRecipes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: 'title', desc: false }],
        },
    });

    return (
        <div>
            <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 border border-primary/50 bg-primary-foreground text-primary"
            />
            {filteredRecipes.length > 0 ? (
                <div>
                    <table className="min-w-full">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="flex items-center px-6 border-b text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
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
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-background ">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-2 whitespace-nowrap text-primary"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'<<'}
                            </button>
                            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'<'}
                            </button>
                            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'>'}
                            </button>
                            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded disabled:opacity-50">
                                {'>>'}
                            </button>
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