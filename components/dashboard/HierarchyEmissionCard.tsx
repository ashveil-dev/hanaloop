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
  const percent = parseInt(p)
  if (percent < 20) return "bg-green-500"
  if (percent < 40) return "bg-lime-500"
  if (percent < 60) return "bg-yellow-400"
  if (percent < 80) return "bg-orange-500"

  return "bg-red-500"
}

type TreeNodeProps = {
  node: Hierarchy;
  rootTotal: number;
  depth?: number;
};

function HierarchyTreeNode({ node, rootTotal, depth = 0 }: TreeNodeProps) {
  const total = node.totalEmission.total;
  const percent = getPercent(total, rootTotal);

  return (
    <div className="space-y-3">
      <div
        className="rounded-2xl border border-slate-100 p-4"
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div className="mb-3 flex justify-between gap-4">
          <div>
            <span className="font-medium text-slate-800">{node.name}</span>
            <p className="mt-1 text-xs text-slate-500">
              Scope1: {formatEmission(node.totalEmission.scope1)} / Scope2:{" "}
              {formatEmission(node.totalEmission.scope2)} / Scope3:{" "}
              {formatEmission(node.totalEmission.scope3)}
            </p>
          </div>

          <span className="shrink-0 text-sm text-slate-500">
            {formatEmission(total)} ({node.unit}) {percent}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${getPercentColor(percent)}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {node.children.length > 0 && (
        <div className="space-y-3">
          {node.children.map((child) => (
            <HierarchyTreeNode
              key={child.id}
              node={child}
              rootTotal={rootTotal}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HierarchyEmissionCard({ hierarchyData }: Parameter) {
  const rootTotal = hierarchyData.totalEmission.total;

  return (
    <div
      id="HierarchyEmissionCard"
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h4 className="text-xl font-bold text-slate-900">계층별 배출량</h4>

      <p className="mb-6 mt-1 text-sm text-slate-500">
        조직 단위별 총 배출량 비교
      </p>

      <div className="space-y-4">
        {hierarchyData.children.map((child) => (
          <HierarchyTreeNode
            key={child.id}
            node={child}
            rootTotal={rootTotal}
          />
        ))}
      </div>
    </div>
  );
}