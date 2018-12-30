
const P={
    category: "problem",
    name: "Problem",
    logo: "P"
};
const S={
    category: "solution",
    name: "Solution",
    logo: "S"
};
const K={
    category: "key-activity",
    name: "Key Activity",
    logo: "K"
};
const U={
    category: "unique-value-propositions",
    name: "Unique Value Propositions",
    logo: "U"
};
const C={
    category: "cost-structure",
    name: "Cost Structure",
    logo: "C"
};
const R={
    category: "revenue",
    name: "Revenue",
    logo: "R"
};

const col_0 = {
    composition: [P],
    column_width: 4,
    note_width: 12
};
const col_1 = {
    composition: [S,K],
    column_width: 4,
    note_width: 12
};

const col_2 = {
    composition: [U],
    column_width: 4,
    note_width: 12
}
const col_3 = {
    composition: [C],
    column_width: 9,
    note_width: 4
}
const col_4 = {
    composition: [R],
    column_width: 3,
    note_width: 12
}
export const lmc_design = [
    col_0,
    col_1,
    col_2,
    col_3,
    col_4
];