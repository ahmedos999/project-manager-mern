import React from 'react';
import {useDroppable} from '@dnd-kit/core';

function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.status,
  });
  const style = {
    backgroundColor: isOver ? props.color : undefined,
    borderRadius:isOver ? '5px':undefined,
    padding:isOver? '2px':undefined,
    transition:'all 0.5s'

  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
export default Droppable