"use client";

import GroupListPicker from "@/components/groups/GroupListPicker";
import type { Group } from "@/lib/client/types/groups";

type Props = {
    groups: Group[] | undefined;
    selectedId?: number;
    onSelect: (group: Group) => void;
};

export default function RecordGroupPicker({ groups, selectedId, onSelect }: Props) {
    return (
        <GroupListPicker
            title="그룹 선택"
            description="이름 또는 ID로 검색 후 선택하세요"
            groups={groups}
            selectedId={selectedId}
            onSelect={(group) => group && onSelect(group)}
        />
    );
}
