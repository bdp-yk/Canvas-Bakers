export const make_default_note = (note_headline, note_description, note_category) => {
    return ({
        note_id: "default_note",
        note_headline,
        note_description,
        note_maker: "Canvas Bakers",
        note_category,
        note_current_verdict: {
            note_encoded_content: "###",
            note_verdict_value: 100.0,
            note_verdict_status: "success",
            note_verdict_message: "Made by Canvas Bakers",
            note_verdict_comment: "That's obvious ...",
        }
    })
}
const KP = {
    category: "key-partners",
    name: "Key Partners",
    logo: "KP",
    direction: "vertical"
};

const KA = {
    category: "key-activites",
    name: "Key Activites",
    logo: "KA",
    direction: "vertical"
};

const KR = {
    category: "key-resources",
    name: "Key Ressources",
    logo: "KR",
    direction: "vertical"
};

const VP = {
    category: "value-propositions",
    name: "Value Propositions",
    logo: "VP",
    direction: "vertical"
};

const CR = {
    category: "customer-relationships",
    name: "Customer Relationships",
    logo: "CR",
    direction: "vertical"
};

const Ch = {
    category: "channels",
    name: "Channels",
    logo: "Ch",
    direction: "vertical"
};

const CSg = {
    category: "customer-segments",
    name: "Customer Segments",
    logo: "CSg",
    direction: "vertical"
};

const CSt = {
    category: "cost-structure",
    name: "Cost Structure",
    logo: "CSt",
    direction: "horizontal"
};

const RS = {
    category: "revenue-stream",
    name: "Revenue Stream",
    logo: "RS",
    direction: "horizontal"
};

const BS = {
    category: "brain-storm",
    name: "Brain Storm",
    logo: "BS",
    direction: "horizontal"
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
    column_width: 8,
    note_width: 4
}
const col_6 = {
    composition: [RS],
    column_width: 4,
    note_width: 6
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
        (make_default_note("Key Partners",
            "Your alliances between competitors or non-competitors.",
            "key-partners"))
    ],
    "key-activites": [
        (make_default_note("Key Activities Notes",
            "The most important activities in executing your project value proposition.",
            "key-activites"))
    ],
    "key-resources": [
        (make_default_note("Key Ressources Notes",
            "The resources that are necessary to create value for the customer.",
            "key-resources"))
    ],
    "value-propositions": [
        (make_default_note("Problem Notes",
            "Set of products and services a business offers to meet the needs of its customers.",
            "value-propositions"))
    ],
    "customer-relationships": [
        (make_default_note("Customer RS Notes",
            "Identify the type of relationship you want to create with your customer segments.",
            "customer-relationships"))
    ],
    "channels": [
        (make_default_note("Channels Notes",
            "How to get in touch with your customers",
            "channels"))
    ],
    "customer-segments": [
        (make_default_note("Custumor Segment Notes",
            "identify which customers your project tries to serve",
            "customer-segments"))
    ],
    "cost-structure": [
        (make_default_note("Cost Structure Notes",
            "This describes the most important monetary consequences while operating under different business models.",
            "cost-structure"))
    ],
    "revenue-stream": [
        (make_default_note("Revenue Notes",
            "The way your project will make income from each customer segment.",
            "revenue-stream"))
    ],
    "brain-storm": [
        (make_default_note("Brain Storming Notes",
            "What's on your mind but can't be classified?",
            "brain-storm"))
    ]
};