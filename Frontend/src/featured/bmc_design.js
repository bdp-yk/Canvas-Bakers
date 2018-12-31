const KP = {
    category: "key-partners",
    name: "Key Partners",
    logo: "KP"
};

const KA = {
    category: "key-activites",
    name: "Key Activites",
    logo: "KA"
};

const KR = {
    category: "key-resources",
    name: "Key Ressources",
    logo: "KR"
};

const VP = {
    category: "value-propositions",
    name: "Value Propositions",
    logo: "VP"
};

const CR = {
    category: "customer-relationships",
    name: "Customer Relationships",
    logo: "CR"
};

const Ch = {
    category: "channels",
    name: "Channels",
    logo: "Ch"
};

const CSg = {
    category: "customer-segments",
    name: "Customer Segments",
    logo: "CSg"
};

const CSt = {
    category: "cost-structure",
    name: "Cost Structure",
    logo: "CSt"
};

const RS = {
    category: "revenue-stream",
    name: "Revenue Stream",
    logo: "RS"
};

const col_0 = {
    composition: [KP],
    column_width: 2,
    note_width: 12
};
const col_1 = {
    composition: [KA, KR],
    column_width: 3,
    note_width: 12
};

const col_2 = {
    composition: [VP],
    column_width: 2,
    note_width: 12
}
const col_3 = {
    composition: [CR, Ch],
    column_width: 3,
    note_width: 12
}
const col_4 = {
    composition: [CSg],
    column_width: 2,
    note_width: 12
}
const col_5 = {
    composition: [CSt],
    column_width: 6,
    note_width: 4
}
const col_6 = {
    composition: [RS],
    column_width: 6,
    note_width: 4
}
export const bmc_design = [
    col_0,
    col_1,
    col_2,
    col_3,
    col_4,
    col_5,
    col_6
];
export const bmc_schema = {
    "key-partners": [],
    "key-activites": [],
    "key-resources": [],
    "value-propositions": [],
    "customer-relationships": [],
    "channels": [],
    "customer-segments": [],
    "cost-structure": [],
    "revenue-stream": [],
    "brain-storm": []
};