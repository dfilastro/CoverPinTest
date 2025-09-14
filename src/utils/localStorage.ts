const STORAGE_KEYS = {
  SEARCH: 'leads_search',
  STATUS_FILTER: 'leads_status_filter',
  SORT_BY: 'leads_sort_by',
  SORT_ORDER: 'leads_sort_order',
} as const;

export interface LeadsFiltersState {
  search: string;
  statusFilter: string;
  sortBy: string;
  sortOrder: string;
}

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to read from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write to localStorage for key "${key}":`, error);
  }
};

export const getStoredSearch = (): string => {
  return getFromStorage(STORAGE_KEYS.SEARCH, '');
};

export const setStoredSearch = (search: string): void => {
  setToStorage(STORAGE_KEYS.SEARCH, search);
};

export const getStoredStatusFilter = (): string => {
  return getFromStorage(STORAGE_KEYS.STATUS_FILTER, '');
};

export const setStoredStatusFilter = (statusFilter: string): void => {
  setToStorage(STORAGE_KEYS.STATUS_FILTER, statusFilter);
};

export const getStoredSortBy = (): string => {
  return getFromStorage(STORAGE_KEYS.SORT_BY, 'score');
};

export const setStoredSortBy = (sortBy: string): void => {
  setToStorage(STORAGE_KEYS.SORT_BY, sortBy);
};

export const getStoredSortOrder = (): string => {
  return getFromStorage(STORAGE_KEYS.SORT_ORDER, 'desc');
};

export const setStoredSortOrder = (sortOrder: string): void => {
  setToStorage(STORAGE_KEYS.SORT_ORDER, sortOrder);
};

export const getAllStoredFilters = (): LeadsFiltersState => {
  return {
    search: getStoredSearch(),
    statusFilter: getStoredStatusFilter(),
    sortBy: getStoredSortBy(),
    sortOrder: getStoredSortOrder(),
  };
};

export const setAllStoredFilters = (filters: LeadsFiltersState): void => {
  setStoredSearch(filters.search);
  setStoredStatusFilter(filters.statusFilter);
  setStoredSortBy(filters.sortBy);
  setStoredSortOrder(filters.sortOrder);
};

export const clearAllStoredFilters = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn('Failed to clear localStorage filters:', error);
  }
};
