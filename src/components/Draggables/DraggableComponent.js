import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const DraggableComponent = ({
  children,
  draggableComponent: Component = 'div',
  draggableProps,
  ...componentProps
}) => (
  <Draggable {...draggableProps}>
    {(provided) => {
      return (
        <Component
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...componentProps}
        >
          {children}
        </Component>
      );
    }}
  </Draggable>
);
