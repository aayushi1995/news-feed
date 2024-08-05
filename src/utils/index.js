export const filterCount = (filters) => {
  let count = 0;
  if (filters.date && filters.date.length > 0) {
    count += 1;
  }
  if (filters.source && filters.source.length > 0) {
    count += 1;
  }
  if (filters.category && filters.category.length > 0) {
    count += 1;
  }
  return count;
};

export const formatDate = (date, showSeprator = true) => {
  const fromDate = new Date(date);
  const year = fromDate.getFullYear();
  const month = fromDate.getMonth() + 1;
  const day = fromDate.getDate();
  return showSeprator
    ? `${year}-${month >= 10 ? month : "0" + month}-${
        day >= 10 ? day : "0" + day
      }`
    : `${year}${month >= 10 ? month : "0" + month}${
        day >= 10 ? day : "0" + day
      }`;
};

export const createGuardianAPIwithFilters = (filters, search) => {
  let filterString = "";

  if (search) {
    filterString = `q="${search}"`;
  }
  // Filters on category
  if (filters?.category?.length > 0) {
    const category = filters?.category?.reduce(
      (result, element) => `${result} AND ${element}`
    );
    filterString = search
      ? `${filterString} AND ${category}&`
      : `q=${category}`;
  } else {
    filterString = `${filterString}&`;
  }

  // Filters on date
  if (filters?.date?.length > 0) {
    filterString = `${filterString}from-date=${formatDate(filters.date[0])}`;
    filterString = `${filterString}&to-date=${formatDate(filters.date[1])}`;
  }
  // API documentation for Guardian doesnt have proper documentation for filter by author / contributor
  return filterString;
};

export const createNewYorkTimesAPIwithFilters = (filters, search) => {
  let filterString = "";

  if (search) {
    filterString = `q=${search}&`;
  }

  // Filters on category
  if (filters?.category?.length > 0) {
    const categories = filters?.category.join(",");
    filterString = filterString + `fq=news_desk:(${categories})&`;
  }
  // Filters on date
  if (filters?.date?.length > 0) {
    filterString = `${filterString}begin_date=${formatDate(
      filters.date[0],
      false
    )}&`;
    filterString = `${filterString}end_date=${formatDate(
      filters.date[1],
      false
    )}&`;
  }
  // API documentation for NY Times doesnt have proper documentation for filter by author / contributor
  return filterString;
};

export const createNewsAPIPayload = (filters, search) => {
  var payloadData = {
    query: {
      $query: {
        $and: [
          {
            lang: "eng",
          },
        ],
      },
      $filter: {
        forceMaxDataTimeWindow: "31",
      },
    },
    resultType: "articles",
    includeArticleCategories: true,
    articlesSortBy: "date",
    apiKey: "cf445d94-7f21-4cbb-ad39-828f15ac1c31",
  };

  if (search) {
    let searchObj = {
      keyword: `${search}`,
      keywordLoc: "body",
    };
    payloadData?.["query"]?.["$query"]?.["$and"].push(searchObj);
  }

  // Filters on category
  if (filters?.category?.length > 0) {
    const categories = filters?.category?.map((cat) => {
      return {
        categoryUri: `dmoz/${cat}`,
      };
    });
    const category = {
      $or: [...categories],
    };
    payloadData?.["query"]?.["$query"]?.["$and"]?.push(category);
  }
  // Filters on date
  if (filters?.date?.length > 0) {
    const dateObj = {
      dateStart: formatDate(filters.date[0]),
      dateEnd: formatDate(filters.date[1]),
    };
    payloadData?.["query"]?.["$query"]?.["$and"]?.push(dateObj);
  }
  return payloadData;
};
