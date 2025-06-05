function parseSortBy(value) {
  const allowedFields = ['name']; // можна додати
  if (typeof value !== 'string' || !allowedFields.includes(value)) {
    return 'name';
  }

  return value;
}

function parseSortOrder(value) {
  if (typeof value === 'undefined') {
    return 'asc';
  }

  if (value !== 'asc' && value !== 'desc') {
    return 'asc';
  }

  return value;
}

export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}
