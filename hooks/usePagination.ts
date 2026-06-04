"use client";

import { useMemo, useState } from "react";
import {
    DEFAULT_PAGE_SIZE,
    getTotalPages,
    paginate,
} from "@/lib/shared/pagination";

export function usePagination<T>(items: T[], pageSize = DEFAULT_PAGE_SIZE) {
    const [requestedPage, setRequestedPage] = useState(1);

    const totalItems = items.length;
    const totalPages = getTotalPages(totalItems, pageSize);
    const page = Math.min(requestedPage, totalPages);

    const paginatedItems = useMemo(
        () => paginate(items, page, pageSize),
        [items, page, pageSize]
    );

    const setPage = (nextPage: number) => {
        setRequestedPage(Math.min(Math.max(1, nextPage), totalPages));
    };

    const resetPage = () => {
        setRequestedPage(1);
    };

    return {
        page,
        setPage,
        resetPage,
        paginatedItems,
        totalPages,
        totalItems,
        pageSize,
    };
}
