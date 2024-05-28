import {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFailure,
  applyFilters,
  resetFilters,
  savePreferences,
  resetPreferences,
  setSearchQuery,
} from "../reducers/newsReducer";
import { GUARDIAN, NEWS_API, NYTIMES } from "../utils/constants";
import {
  createGuardianAPIwithFilters,
  createNewYorkTimesAPIwithFilters,
  createNewsAPIPayload,
} from "../utils/index";

const API_KEYS = {
  guardian: "25eb6639-74bd-412c-a499-820ef91cce6d",
  nyt: "NklkuW1TIPxl2wMrFzHCAkieVYRDMImb",
  newsapi: "your-newsapi-key",
};

const fetchGuardianNews = async (filters, search) => {
  let filterString = createGuardianAPIwithFilters(filters, search);

  let url = `https://content.guardianapis.com/search?${filterString}&show-elements=image&show-fields=trailText&show-tags=contributor&api-key=${API_KEYS.guardian}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.response.results.map((item) => ({
    id: item.id,
    title: item.webTitle,
    date: item.webPublicationDate,
    author: item?.tags?.[0]?.webTitle,
    source: "The Guardian",
    url: item.webUrl,
    media: item?.elements?.[0]?.assets?.[0]?.file,
    content: item?.fields?.trailText,
    section: item?.sectionName,
  }));
};

const fetchNYTNews = async (filters, search) => {
  let filterString = createNewYorkTimesAPIwithFilters(filters, search);
  let url = `https://api.nytimes.com/svc/news/v3/content/all/articlesearch.json?${filterString}api-key=${API_KEYS.nyt}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results.map((item) => ({
    content: item?.abstract,
    media: item?.multimedia?.[2]?.url,
    id: item.uri,
    title: item.title,
    date: item.published_date,
    author: item?.byline,
    source: "NY Times",
    url: item.url,
    section: item.section || item.subsection,
  }));
};

const fetchNewsAPINews = async (filters, search) => {
  let payload = createNewsAPIPayload(filters, search);

  const response = await fetch(
    "https://newsapi.ai/api/v1/article/getArticles ",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  return data?.articles?.results?.map((item) => ({
    content: item?.body?.substring(0, 50),
    media: item?.image?.split("?")[0] || "",
    id: item.uri,
    title: item.title,
    date: item.date,
    author: "Unknown",
    source: "News API",
    url: item.url,
    section:
      item?.categories?.length > 0 ? item?.categories?.[0].label : "Unknown",
  }));
};

export const fetchFilteredNews = (filters, search) => async (dispatch) => {
  dispatch(fetchNewsRequest());

  try {
    const promiseNewsAPI = [];
    if (
      filters?.source === null ||
      filters?.source.length === 0 ||
      filters?.source?.indexOf(GUARDIAN) >= 0
    ) {
      promiseNewsAPI.push(fetchGuardianNews(filters, search));
    }
    if (
      filters?.source === null ||
      filters?.source.length === 0 ||
      filters?.source?.indexOf(NYTIMES) >= 0
    ) {
      promiseNewsAPI.push(fetchNYTNews(filters, search));
    }
    if (
      filters?.source === null ||
      filters?.source.length === 0 ||
      filters?.source?.indexOf(NEWS_API) >= 0
    ) {
      promiseNewsAPI.push(fetchNewsAPINews(filters, search));
    }

    const news = await Promise.all(promiseNewsAPI);

    let allNews = [];
    news?.forEach((element) => {
      allNews = allNews?.length > 0 ? [...allNews, ...element] : [...element];
    });

    const shuffledNews = allNews.sort(() => 0.5 - Math.random());

    dispatch(fetchNewsSuccess(shuffledNews));
  } catch (error) {
    dispatch(fetchNewsFailure(error.toString()));
  }
};

export const handleApplyFilters = (props) => async (dispatch) => {
  dispatch(applyFilters(props));
};

export const handleResetFilters = () => async (dispatch) => {
  dispatch(resetFilters());
};

export const handlePreferences = (props) => async (dispatch) => {
  dispatch(savePreferences(props));
  localStorage.setItem("news-prefrences", JSON.stringify(props));
};

export const handleResetPreferences = () => async (dispatch) => {
  dispatch(resetPreferences());
  localStorage.removeItem("news-prefrences");
};

export const handleSearchQuery = (props) => async (dispatch) => {
  dispatch(setSearchQuery(props));
};
