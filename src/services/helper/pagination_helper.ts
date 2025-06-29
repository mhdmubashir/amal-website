export function parsePaginatedResponse<T>(response: any) {
  const data = response?.data?.data || {};
  return {
    items: data.items || [],
    pageCount: data.pageCount || 0,
    totalPages: data.totalPages || 0,
    currentPage: data.currentPage || 1,
    totalItems: data.totalItems || 0,
    search: data.search || "",
  };
}
