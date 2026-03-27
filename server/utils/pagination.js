function paginate(query, { page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  return {
    sql: `${query} LIMIT ? OFFSET ?`,
    values: [limit, offset],
  };
}

function paginationMeta(total, page, limit) {
  return {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  };
}

module.exports = { paginate, paginationMeta };
