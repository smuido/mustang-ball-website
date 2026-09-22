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
