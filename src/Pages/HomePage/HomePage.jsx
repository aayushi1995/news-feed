import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredNews, handleSearchQuery } from "../../thunk/newsThunk";
import Navigation from "../../Components/Navigation/Navigation";
import NewsCard from "../../Components/NewsCard/NewsCard";
import { Input, Button, Flex, Skeleton } from "@mantine/core";
import { filterCount } from "../../utils/index";
import "./HomePage.css";

const SkeletonLoader = () => {
  const emptyArray = new Array(10).fill();
  return (
    <>
      {emptyArray.map((_) => (
        <>
          <Skeleton height={200} mt={50} mb="xl" />
        </>
      ))}
    </>
  );
};
const Homepage = () => {
  const dispatch = useDispatch();

  const { loading, error, preferences, filteredNews, filters, searchQuery } =
    useSelector((state) => state.news);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    dispatch(handleSearchQuery(search));
    const obj = filterCount(filters) > 0 ? filters : preferences;
    dispatch(fetchFilteredNews(obj, search));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  useEffect(() => {
    dispatch(fetchFilteredNews(preferences));
  }, [dispatch]);

  if (loading)
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div>
      {/* Navigation */}
      <Navigation />

      {/* Searchable */}
      <Flex
        display={"flex"}
        justify={"center"}
        width="100%"
        className="searchWrapper"
      >
        <Input
          placeholder="Search News"
          className={"search searchInput"}
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
          width="100%"
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch} variant="filled" className="searchButton">
          Search
        </Button>
      </Flex>

      {/* News Card */}
      <div className="newsCardWrapper">
        {loading ? (
          <SkeletonLoader />
        ) : (
          filteredNews &&
          filteredNews?.map((props) => <NewsCard {...props} key={props.id} />)
        )}
      </div>
    </div>
  );
};

export default Homepage;
