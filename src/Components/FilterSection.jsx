import React from "react";
import { ActionIcon, Drawer, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterForm from "./FilterForm/FilterForm";
import { IconFilter } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { filterCount } from "../utils/index";

const FilterSection = () => {
  const { filters } = useSelector((state) => state.news);
  const [filterOpened, { open: openFilterDrawer, close: closeFilterDrawer }] =
    useDisclosure(false);
  return (
    <>
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="Settings"
        onClick={openFilterDrawer}
      >
        <IconFilter
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
          color="gray"
        />
        <span>{filterCount(filters) > 0 && filterCount(filters)}</span>
      </ActionIcon>

      <Drawer
        opened={filterOpened}
        onClose={closeFilterDrawer}
        title={
          <Text size="lg" fw={700}>
            Filters
          </Text>
        }
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        position="right"
      >
        <FilterForm data={filters} handleClose={closeFilterDrawer} />
      </Drawer>
    </>
  );
};

export default FilterSection;
