// Small shared controls for editing array-shaped content (paragraphs,
// milestones, FAQ entries, nav links, etc.) — kept intentionally simple
// since every list's item shape differs; callers render their own item
// fields and drop these in alongside them.

export function RemoveButton({ onClick, label = 'Remove' }) {
  return (
    <button type="button" className="mb-list-remove" onClick={onClick}>
      {label}
    </button>
  );
}

export function AddButton({ onClick, label = 'Add item' }) {
  return (
    <button type="button" className="mb-list-add" onClick={onClick}>
      + {label}
    </button>
  );
}

// A dedicated drag handle — never spread onto a whole row or an Editable/
// RichEditable region, since `draggable` on either fights with click-to-
// edit, and native drag started inside a contentEditable is unreliable
// across browsers. Spread `handleProps` from useDragReorder's
// getHandleProps(index) onto this.
export function DragHandle({ handleProps, label = 'Reorder' }) {
  return (
    <span className="mb-drag-handle" aria-label={label} role="button" tabIndex={-1} {...handleProps}>
      &#8942;&#8942;
    </span>
  );
}
