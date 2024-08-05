import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredNews, handleSearchQuery } from "../../thunk/newsThunk";
import Navigation from "../../Components/Navigation/Navigation";
import NewsCard from "../../Components/NewsCard/NewsCard";
import { Input, Button, Flex } from "@mantine/core";
import { filterCount } from "../../utils/index";
import {SkeletonLoader} from '../../Components/SkeletonLoader'
import { notifications } from '@mantine/notifications';
import "./HomePage.css";


const Homepage = () => {
  const dispatch = useDispatch();

  const { loading, error, preferences, filteredNews, filters } = useSelector((state) => state.news);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    dispatch(handleSearchQuery(search));
    const obj = filterCount(filters) > 0 ? filters : preferences;
    dispatch(fetchFilteredNews(obj, search));

    notifications.show({
      title: `Search got applied successfully`,
      color: 'green',
      autoClose: 3000
    })
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
          <SkeletonLoader height={330} animate={false} />
        ) : (
          filteredNews &&
          filteredNews?.map((props) => <NewsCard {...props} key={props.id} />)
        )}
      </div>
    </div>
  );
};

export default Homepage;
