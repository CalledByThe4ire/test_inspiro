import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "./sort-slice";
import { selectSort } from "../sort/sort-slice";
import { SortDirection } from "../../consts";

export const useSortableData = (items) => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sort !== null) {
      sortableItems.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === SortDirection.ASCENDING ? -1 : 1;
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === SortDirection.ASCENDING ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sort]);

  const requestSort = (key) => {
    let direction = SortDirection.ASCENDING;
    if (
      sort &&
      sort.key === key &&
      sort.direction === SortDirection.ASCENDING
    ) {
      direction = SortDirection.DESCENDING;
    }

    dispatch(setSort({ key, direction }));
  };

  return { items: sortedItems, requestSort, sort };
};
