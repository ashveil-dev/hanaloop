"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Hierarchy } from "@/lib/client/types/dashboard";

type Parameter = {
    hierarchyData: Hierarchy;
};

function formatEmission(value: number) {
    return value.toLocaleString();
}

function getPercent(value: number, total: number) {
    if (total === 0) return "0.00";
    return ((value / total) * 100).toFixed(2);
}

function getPercentColor(p: string) {
    const percent = parseInt(p);
    if (percent < 20) return "bg-green-500";
    if (percent < 40) return "bg-lime-500";
    if (percent < 60) return "bg-yellow-400";
    if (percent < 80) return "bg-orange-500";
    return "bg-red-500";
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
    return (
        <svg
            className={clsx(
                "h-4 w-4 shrink-0 text-slate-400 transition-transform",
                expanded && "rotate-90"
            )}
            viewBox="0 0 16 16"
            fill="currentColor"
        >
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 7 6.22 4.28a.75.75 0 0 1 0-1.06z" />
        </svg>
    );
}

type TreeNodeProps = {
    node: Hierarchy;
    rootTotal: number;
    depth?: number;
    defaultExpanded?: boolean;
};

function HierarchyTreeNode({
    node,
    rootTotal,
    depth = 0,
    defaultExpanded = false,
}: TreeNodeProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const hasChildren = node.children.length > 0;
    const total = node.totalEmission.total;
    const percent = getPercent(total, rootTotal);

    const toggle = () => {
        if (hasChildren) setExpanded((prev) => !prev);
    };

    return (
        <div className="space-y-3">
            <div
                className="rounded-2xl border border-slate-100 p-3 sm:p-4"
                style={{ marginLeft: `${depth * 12}px` }}
            >
                <div className="mb-3 flex gap-2 sm:gap-3">
                    {hasChildren ? (
                        <button
                            type="button"
                            onClick={toggle}
                            aria-expanded={expanded}
                            aria-label={expanded ? `${node.name} 접기` : `${node.name} 펼치기`}
                            className="mt-0.5 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md transition hover:bg-slate-100"
                        >
                            <ChevronIcon expanded={expanded} />
                        </button>
                    ) : (
                        <span className="mt-0.5 inline-block h-6 w-6 shrink-0" />
                    )}

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <div className="min-w-0">
                                <button
                                    type="button"
                                    onClick={toggle}
                                    disabled={!hasChildren}
                                    className={clsx(
                                        "text-left font-medium text-slate-800",
                                        hasChildren && "cursor-pointer hover:text-emerald-700"
                                    )}
                                >
                                    {node.name}
                                </button>
                                <p className="mt-1 text-xs text-slate-500">
                                    Scope1: {formatEmission(node.totalEmission.scope1)} / Scope2:{" "}
                                    {formatEmission(node.totalEmission.scope2)} / Scope3:{" "}
                                    {formatEmission(node.totalEmission.scope3)}
                                </p>
                            </div>

                            <span className="shrink-0 text-sm text-slate-500 sm:text-right">
                                {formatEmission(total)} ({node.unit}) {percent}%
                            </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className={`h-full rounded-full ${getPercentColor(percent)}`}
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {hasChildren && expanded && (
                <div className="space-y-3">
                    {node.children.map((child) => (
                        <HierarchyTreeNode
                            key={child.id}
                            node={child}
                            rootTotal={rootTotal}
                            depth={depth + 1}
                            defaultExpanded={defaultExpanded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function HierarchyEmissionCard({ hierarchyData }: Parameter) {
    const rootTotal = hierarchyData.totalEmission.total;
    const [allExpanded, setAllExpanded] = useState(false);
    const [expandKey, setExpandKey] = useState(0);

    const toggleAll = () => {
        setAllExpanded((prev) => !prev);
        setExpandKey((k) => k + 1);
    };

    return (
        <div
            id="HierarchyEmissionCard"
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h4 className="text-xl font-bold text-slate-900">계층별 배출량</h4>
                    <p className="mt-1 text-sm text-slate-500">조직 단위별 총 배출량 비교</p>
                </div>

                <button
                    type="button"
                    onClick={toggleAll}
                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                    {allExpanded ? "전체 접기" : "전체 펼치기"}
                </button>
            </div>

            <div className="space-y-4">
                {hierarchyData.children.map((child) => (
                    <HierarchyTreeNode
                        key={`${child.id}-${expandKey}`}
                        node={child}
                        rootTotal={rootTotal}
                        defaultExpanded={allExpanded}
                    />
                ))}
            </div>
        </div>
    );
}
