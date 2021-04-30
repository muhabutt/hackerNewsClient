import {Data} from '../types';

/**
 *
 * @param array ( Stories Ids or Comments Ids
 * @param currentData (Current Stories or Comments State )
 * @param page_size ( How many items to be displayed in the FlatList
 */
export const paginate = (
  array: Array<number>,
  currentData: Array<Data>,
  page_size: number,
): Array<number> => {
  let paginatedData: Array<number> = [];
  let nextIds: Array<number> = [];
  if (array) {
    //Get stories ids from 0 to page_size
    paginatedData = array.slice(0, page_size);
  }
  // Delete previous ids which are already available in the currentData
  if (currentData.length > 0) {
    //Create Ids Array from current State of Data.
    let ids: Array<number> = currentData.map((data: Data) => {
      return data.id;
    });
    //Filter the ones which are not available in the current State of Data.
    nextIds = paginatedData.filter(id => !ids.includes(id));
  } else {
    //If ids are not available in the currentData State. Component did mount
    nextIds = paginatedData;
  }
  return nextIds;
};

/**
 * Capitalize the first character of a word
 * @param str
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
