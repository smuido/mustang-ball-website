import { useRef, useState } from 'react';

// Native HTML5 drag-and-drop for reordering a flat list. The drag handle
// (a small dedicated element — see DragHandle in ListControls.jsx) gets
// `getHandleProps(index)`; the row/item wrapper around it gets
// `getRowProps(index)` so a drop anywhere on the row (not just the handle)
// reorders it. Source index is tracked in a ref, not state, so nothing
// re-renders mid-drag — only the drop-target highlight is state.
//
// `group` lets one hook instance serve several independent lists (e.g. one
// per role column in EditPastEvents.jsx, where a list's own path isn't
// known until render time, so a separate hook call per list isn't
// possible). Dragging across groups is ignored — a drop only reorders
// when the drag started in the same group it's dropped over. Callers with
// a single list can omit it.
export default function useDragReorder(onReorder) {
  const dragRef = useRef(null); // { group, index } | null
  const [dragOver, setDragOver] = useState(null); // { group, index } | null

  const reset = () => {
    dragRef.current = null;
    setDragOver(null);
  };

  const getHandleProps = (index, group = 'default') => ({
    draggable: true,
    onDragStart: (event) => {
      dragRef.current = { group, index };
      event.dataTransfer.effectAllowed = 'move';
    },
    onDragEnd: reset,
  });

  const getRowProps = (index, group = 'default') => {
    const isOver = dragOver !== null && dragOver.group === group && dragOver.index === index;
    return {
      onDragOver: (event) => {
        if (!dragRef.current || dragRef.current.group !== group) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        if (!isOver) setDragOver({ group, index });
      },
      onDragLeave: () => {
        if (isOver) setDragOver(null);
      },
      onDrop: (event) => {
        event.preventDefault();
        const from = dragRef.current;
        reset();
        if (!from || from.group !== group || from.index === index) return;
        onReorder(from.index, index, group);
      },
      className: isOver ? 'mb-drag-over' : '',
    };
  };

  return { getHandleProps, getRowProps };
}
