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
        {
            "note_id": "-1",
            "note_headline": "Problem Notes",
            "note_description": "Here you can state what are the main problem your Project may face.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "problem",
        }
    ],
    "solution": [
        {
            "note_id": "-2",
            "note_headline": "Solution Notes",
            "note_description": "Some of your project features that will help you.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "solution",
        }
    ],
    "key-activity": [
        {
            "note_id": "-3",
            "note_headline": "Key Activities Notes",
            "note_description": "Your project main field of activity",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "key-activity",
        }
    ],
    "unique-value-propositions": [
        {
            "note_id": "-4",
            "note_headline": "Key Activities Notes",
            "note_description": "Key Activities for a successful Business",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "unique-value-propositions",
        }
    ],
    "cost-structure": [
        {
            "note_id": "-5",
            "note_headline": "Cost Structure Notes",
            "note_description": "Cost of various deals within the Project",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "cost-structure",
        }
    ],
    "revenue": [
        {
            "note_id": "-6",
            "note_headline": "Revenu Plans",
            "note_description": "How will you generate income",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "revenue",
        }
    ],
    "brain-storm": [
        {
            "note_id": "-7",
            "note_headline": "BrainStorming Notes",
            "note_description": "What's on your mind but can't be classified?",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_category": "brain-storm",
        }
    ]
}