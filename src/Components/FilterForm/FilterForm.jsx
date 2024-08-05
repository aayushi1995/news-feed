import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleApplyFilters,
  handleResetFilters,
  handlePreferences,
  handleResetPreferences,
  fetchFilteredNews
} from "../../thunk/newsThunk";
import { Button, MultiSelect, Flex, Input, Popover, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from "@mantine/dates";
import { IconCheck, IconX } from "@tabler/icons-react";
import "./FilterForm.css";
import {GUARDIAN, NYTIMES, NEWS_API} from '../../utils/constants'
import { emptyFilterState } from "../../reducers/newsReducer";
import { notifications } from '@mantine/notifications';


// Common component for Preferences and filters.

const FilterForm = ({ data, handleClose, showPreferencesForm = false }) => {

  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState(data?.date || []);
  const [source, setSource] = useState(data?.source || []);
  const [category, setCategory] = useState(data?.category || []);
  const [author, setAuthor] = useState(data?.author || "");

  const [openedNote, { close: closeNote, open: openNote }] = useDisclosure(false);


  const onApplyFilter = (e) => {
    if (!showPreferencesForm) {
      const obj = {
        source: source,
        category: category,
        date: dateRange,
      }
      dispatch(
        handleApplyFilters(obj)
      );
      dispatch(fetchFilteredNews(obj));
    } else {
      const obj = {
        source: source,
        category: category,
        author: author,
      }
      dispatch(
        handlePreferences(obj)
      );
    }
    
    handleClose();
    notifications.show({
      title: `${showPreferencesForm ? "Preferences" : "Filters"} applied successfully`,
      color: 'green',
      autoClose: 3000,
    })
  };

  const onResetFilter = () => {
    if (!showPreferencesForm) {
      dispatch(handleResetFilters());
      dispatch(fetchFilteredNews(emptyFilterState));

    } else {
      dispatch(handleResetPreferences());
    }
    handleClose();
    notifications.show({
      title: `${showPreferencesForm ? "Preferences" : "Filters"} got removed successfully`,
      color: 'yellow',
      autoClose: 3000

    })
  };

  return (
    <>
      {showPreferencesForm ? (  
      
        /*  Since the GUARDIAN API, NYTIMES API doesnt give an option to filter by author, I have skipped that option */
        /* <div style={{ width: "100%", margin: "20px auto" }}>
          <Input
            placeholder="Enter your author"
            className={"authorInput"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div> */
        <></>
      ) : (
        <DatePickerInput
          placeholder="Select Date Range of your choice"
          type="range"
          allowSingleDateInRange
          value={dateRange}
          onChange={setDateRange}
          minDate={new Date(2020, 1, 10)}
          maxDate={new Date()}
        />
      )}

      <br />
      <MultiSelect
        value={source}
        label="Source"
        placeholder="Select sources"
        data={[GUARDIAN, NYTIMES, NEWS_API]}
        onChange={setSource}
      />
      <br />
      <MultiSelect
        label="Categories"
        placeholder="Select Categories"
        data={[
          "Business",
          "Politics",
          "Science",
          "Worldwide",
          "Sports",
          "Technology",
          "Arts",
          "Fashion",
          "Food",
          "Health",
          "All",
        ]}
        value={category}
        onChange={setCategory}
      />
      <br />
      <br />
      <Flex display={"flex"} justify={"space-around"}>
        <Button
          variant="outline"
          leftSection={<IconX size={14} />}
          onClick={onResetFilter}
          className="filterButtons"
        >
          Reset
        </Button>
          <Popover
            width={200}
            position="bottom"
            withArrow
            shadow="md"
            opened={openedNote}
          >
          <Popover.Target>
         <Button
            variant="filled"
            leftSection={<IconCheck size={14} />}
            onClick={onApplyFilter}
            className="filterButtons"
            onMouseEnter={openNote} 
            onMouseLeave={closeNote}
          >
             {!showPreferencesForm ? "Apply" : "Save"}
          </Button>
          </Popover.Target>
             
           
            <Popover.Dropdown style={{ pointerEvents: "none" }}>
              <Text size="sm">
              Please note the filters will override the preferences.
              </Text>
            </Popover.Dropdown>
          </Popover>
        
      </Flex>
    </>
  );
};
export default FilterForm;
