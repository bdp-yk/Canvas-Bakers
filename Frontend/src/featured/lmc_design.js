const P = {
    category: "problem",
    name: "Problem",
    logo: "P"
};
const S = {
    category: "solution",
    name: "Solution",
    logo: "S"
};
const K = {
    category: "key-activity",
    name: "Key Activity",
    logo: "K"
};
const U = {
    category: "unique-value-propositions",
    name: "Unique Value Propositions",
    logo: "U"
};
const C = {
    category: "cost-structure",
    name: "Cost Structure",
    logo: "C"
};
const R = {
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
export const lmc_design = [
    col_0,
    col_1,
    col_2,
    col_3,
    col_4
];
export const lmc_schema = {
    "problem": [
        {
            "note_id": "problem-1",
            "note_headline": "Problem Notes",
            "note_description": "Here you can state what are the main problem your Project may face.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "problem",
            "note_index_in_column": 0
        }
    ],
    "solution": [
        {
            "note_id": "solution-1",
            "note_headline": "Solution Notes",
            "note_description": "Some of your project features that will help you.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "solution",
            "note_index_in_column": 0
        }
    ],
    "key-activity": [
        {
            "note_id": "activity-1",
            "note_headline": "Key Activities Notes",
            "note_description": "Your project main field of activity",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "key-activity",
            "note_index_in_column": 0
        }
    ],
    "unique-value-propositions": [
        {
            "note_id": "value-1",
            "note_headline": "Key Activities Notes",
            "note_description": "Key Activities for a successful Business",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "unique-value-propositions",
            "note_index_in_column": 0
        }
    ],
    "cost-structure": [
        {
            "note_id": "structure-1",
            "note_headline": "Cost Structure Notes",
            "note_description": "Cost of various deals within the Project",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "cost-structure",
            "note_index_in_column": 0
        }
    ],
    "revenue": [
        {
            "note_id": "revenue-1",
            "note_headline": "Revenu Plans",
            "note_description": "How will you generate income",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "revenue",
            "note_index_in_column": 0
        }
    ],
    "brain-storm": [
        {
            "note_id": "storm-1",
            "note_headline": "BrainStorming Notes",
            "note_description": "What's on your mind but can't be classified?",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "brain-storm",
            "note_index_in_column": 0
        }
    ]
}