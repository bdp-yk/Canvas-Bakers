import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// droppableId="droppable-1" type="PERSON"
export const GenerateDroppable = ({ component: Component, ...rest }) => (<Droppable {...rest}>
    {(provided, snapshot) => (
        <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
            {...provided.droppableProps}
        >
            <Component {...rest} />
            {provided.placeholder}
        </div>
    )}
</Droppable>)
