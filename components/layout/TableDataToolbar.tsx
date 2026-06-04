"use client";

import NotionFilterPanel, {
    type FilterFieldDef,
} from "@/components/layout/notion/NotionFilterPanel";
import NotionPillButton from "@/components/layout/notion/NotionPillButton";
import NotionPopover from "@/components/layout/notion/NotionPopover";
import NotionSortPanel, {
    type SortFieldDef,
} from "@/components/layout/notion/NotionSortPanel";
import TableSearchBar from "@/components/layout/TableSearchBar";
import type { SortRule } from "@/lib/shared/tableSort";

type Accent = "cyan" | "teal" | "amber";

type Props = {
    filterFields: FilterFieldDef[];
    filterValues: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
    onFilterClear: () => void;
    sortFields: SortFieldDef[];
    sort: SortRule;
    onSortChange: (sort: SortRule) => void;
    onSortReset: () => void;
    filteredCount: number;
    totalCount: number;
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    accent?: Accent;
};

export default function TableDataToolbar({
    filterFields,
    filterValues,
    onFilterChange,
    onFilterClear,
    sortFields,
    sort,
    onSortChange,
    onSortReset,
    filteredCount,
    totalCount,
    search,
    onSearchChange,
    searchPlaceholder = "검색하기",
    accent = "cyan",
}: Props) {
    const activeFilterCount = filterFields.filter(
        (field) => (filterValues[field.key] ?? "all") !== "all"
    ).length;

    const isSortActive =
        sort.field !== sortFields[0]?.key || sort.direction !== "desc";

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
                <NotionPopover
                    trigger={({ open, onToggle }) => (
                        <NotionPillButton
                            label="필터"
                            icon="filter"
                            open={open}
                            active={activeFilterCount > 0}
                            badge={activeFilterCount}
                            onClick={onToggle}
                        />
                    )}
                >
                    <NotionFilterPanel
                        fields={filterFields}
                        values={filterValues}
                        onChange={onFilterChange}
                        onClear={onFilterClear}
                    />
                </NotionPopover>

                <NotionPopover
                    trigger={({ open, onToggle }) => (
                        <NotionPillButton
                            label="정렬"
                            icon="sort"
                            open={open}
                            active={isSortActive}
                            onClick={onToggle}
                        />
                    )}
                >
                    <NotionSortPanel
                        fields={sortFields}
                        sort={sort}
                        onChange={onSortChange}
                        onReset={onSortReset}
                    />
                </NotionPopover>

                <span className="text-xs text-slate-400">
                    {filteredCount === totalCount
                        ? `전체 ${totalCount}건`
                        : `${filteredCount}건 / 전체 ${totalCount}건`}
                </span>
            </div>

            <TableSearchBar
                variant="toolbar"
                value={search}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
                accent={accent}
            />
        </div>
    );
}
