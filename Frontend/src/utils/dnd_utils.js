export const applyDrag = (arr, dragResult) => {
    const {
        removedIndex,
        addedIndex,
        payload
    } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
};

export const find_index_by_property = (_array, property_value, property_name = "note_id") => {
    let b = _array.findIndex(
        e => e[property_name] === property_value
    )
    if (b === -1) b = _array.length;
    return b;

}

export const find_exact_index_by_property = (_array, property_value, property_name = "note_id") => {
    let b = _array.findIndex(
        e => e[property_name] === property_value
    )
    return b;
}


export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(creator(i));
    }
    return result;
};