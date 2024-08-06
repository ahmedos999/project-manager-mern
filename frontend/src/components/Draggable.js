import React, { useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data:props.task
  });

  const [isDragging, setIsDragging] = useState(false);
  const clickTimeoutRef = useRef(null);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleClick = (event) => {
    if (!isDragging) {
      props.openmodel()
    }
  };

  const handleMouseDown = () => {
    clickTimeoutRef.current = setTimeout(() => setIsDragging(true), 200);
  };

  const handleMouseUp = () => {
    clearTimeout(clickTimeoutRef.current);
    if (isDragging) {
      setIsDragging(false);
    } else {
      handleClick();
    }
  };

  return (
    <button
      className='w-full'
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.children}
    </button>
  );
}

export default Draggable;
