import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// droppableId="droppable-1" type="PERSON"
export const GenerateDraggable = ({ component: Component, ...rest }) => (
    rest.draggableId=="default_note"?
        <Draggable {...rest}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Component {...rest} />
                </div>
            )}
        </Draggable>:
        <Component {...rest} />

)