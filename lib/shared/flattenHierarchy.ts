import type { Hierarchy } from "@/lib/client/types/dashboard";

export function collectHierarchyNodes(
    node: Hierarchy,
    includeRoot = false
): Hierarchy[] {
    const nodes: Hierarchy[] = includeRoot ? [node] : [];

    for (const child of node.children) {
        nodes.push(child, ...collectHierarchyNodes(child, false));
    }

    return nodes;
}

export function getTopGroupsByEmission(
    hierarchy: Hierarchy,
    limit = 8,
    excludeRoot = true
): Hierarchy[] {
    const nodes = collectHierarchyNodes(hierarchy, !excludeRoot);

    return [...nodes]
        .sort((a, b) => b.totalEmission.total - a.totalEmission.total)
        .slice(0, limit);
}
