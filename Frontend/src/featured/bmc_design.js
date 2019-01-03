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

const BS = {
    category: "brain-storm",
    name: "Brain Storm",
    logo: "BS"
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
const col_7 = {
    composition: [BS],
    column_width: 12,
    note_width: 3
}
export const bmc_design = [
    col_0,
    col_1,
    col_2,
    col_3,
    col_4,
    col_5,
    col_6,
    col_7
];
export const bmc_schema = {
    "key-partners": [
        {
            "note_id": "-1",
            "note_headline": "Key Partners",
            "note_description": "Your alliances between competitors or non-competitors.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "key-partners-partners",
            "note_index_in_column": 0
        }
    ],
    "key-activites": [
        {
            "note_id": "-1",
            "note_headline": "Key Activities Notes",
            "note_description": "The most important activities in executing your project value proposition.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "key-activites",
            "note_index_in_column": 0
        }
    ],
    "key-resources": [
        {
            "note_id": "-1",
            "note_headline": "Key Ressources Notes",
            "note_description": "The resources that are necessary to create value for the customer.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "key-resources",
            "note_index_in_column": 0
        }
    ],
    "value-propositions": [
        {
            "note_id": "-1",
            "note_headline": "Problem Notes",
            "note_description": "Set of products and services a business offers to meet the needs of its customers.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "value-propositions",
            "note_index_in_column": 0
        }
    ],
    "customer-relationships": [
        {
            "note_id": "-1",
            "note_headline": "Customer RS Notes",
            "note_description": "Identify the type of relationship you want to create with your customer segments.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "customer-relationships",
            "note_index_in_column": 0
        }
    ],
    "channels": [
        {
            "note_id": "-1",
            "note_headline": "Channels Notes",
            "note_description": "How to get in touch with your customers",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "channels",
            "note_index_in_column": 0
        }
    ],
    "customer-segments": [
        {
            "note_id": "-1",
            "note_headline": "Custumor Segment Notes",
            "note_description": "identify which customers your project tries to serve",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "customer-segments",
            "note_index_in_column": 0
        }
    ],
    "cost-structure": [
        {
            "note_id": "-1",
            "note_headline": "Cost Structure Notes",
            "note_description": "This describes the most important monetary consequences while operating under different business models.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "cost-structure",
            "note_index_in_column": 0
        }
    ],
    "revenue-stream": [
        {
            "note_id": "-1",
            "note_headline": "Revenue Notes",
            "note_description": "The way your project will make income from each customer segment.",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "revenue-stream",
            "note_index_in_column": 0
        }
    ],
    "brain-storm": [
        {
            "note_id": "-1",
            "note_headline": "Brain Storming Notes",
            "note_description": "What's on your mind but can't be classified?",
            "note_maker": "Canvas Bakers",
            "note_verdict": 100,
            "note_verdict_message": "Made by Canvas Bakers, that's obvious ...",
            "note_column": "brain-storm",
            "note_index_in_column": 0
        }
    ]
};