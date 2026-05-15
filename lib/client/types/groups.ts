export type Group = {
    id : number,
    name : string,
    parentId : number | null,
    createdAt : string,
}

export type Groups = Group[]
