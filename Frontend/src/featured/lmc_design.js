import {
    make_default_note
} from "./bmc_design";
export const short_lmc_view = [{
    category: "problem",
    name: "Problem",
}, {
    category: "solution",
    name: "Solution",
}, {
    category: "key-activity",
    name: "Key Activity",
}, {
    category: "unique-value-propositions",
    name: "Unique Value"
}, {
    category: "cost-structure",
    name: "Cost Structure",
}, {
    category: "revenue",
    name: "Revenue",
}
// , {
//     category: "brain-storm",
//     name: "Brain Storm"
// }
]

const P = {
    category: "problem",
    name: "Problem",
    logo: "P",
    direction: "vertical"
};
const S = {
    category: "solution",
    name: "Solution",
    logo: "S",
    direction: "vertical"
};
const K = {
    category: "key-activity",
    name: "Key Activity",
    logo: "K",
    direction: "vertical"
};
const U = {
    category: "unique-value-propositions",
    name: "Unique Value Propositions",
    logo: "U",
    direction: "vertical"
};
const C = {
    category: "cost-structure",
    name: "Cost Structure",
    logo: "C",
    direction: "horizontal"
};
const R = {
    category: "revenue",
    name: "Revenue",
    logo: "R",
    direction: "horizontal"
};
const BS = {
    category: "brain-storm",
    name: "Brain Storm",
    logo: "BS",
    direction: "horizontal"
};

const col_0 = {
    composition: [P],
    column_width: 4,
    note_width: 12
};
const col_1 = {
    composition: [S, K],
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
const col_5 = {
    composition: [BS],
    column_width: 12,
    note_width: 3
}
export const lmc_design = [
    col_0,
    col_1,
    col_2,
    col_3,
    col_4,
    col_5
];
export const lmc_schema = {
    "problem": [
        make_default_note("Problem Notes",
            "Here you can state what are the main problem your Project may face.",
            "problem",
        )
    ],
    "solution": [
        make_default_note("Solution Notes",
            "Some of your project features that will help you.",
            "solution",
        )
    ],
    "key-activity": [
        make_default_note("Key Activities Notes",
            "Your project main field of activity",
            "key-activity",
        )
    ],
    "unique-value-propositions": [
        make_default_note("Key Activities Notes",
            "Key Activities for a successful Business",
            "unique-value-propositions",
        )
    ],
    "cost-structure": [
        make_default_note("Cost Structure Notes",
            "Cost of various deals within the Project",
            "cost-structure",
        )
    ],
    "revenue": [
        make_default_note("Revenu Plans",
            "How will you generate income",
            "revenue",
        )
    ],
    "brain-storm": [
        make_default_note("BrainStorming Notes",
            "What's on your mind but can't be classified?",
            "brain-storm",
        )
    ]
}