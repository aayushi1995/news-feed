import React from "react";
import { ActionIcon, Drawer, Text, Accordion } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterForm from "./FilterForm/FilterForm";
import { IconSettings } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const Settings = () => {
  const { preferences } = useSelector((state) => state.news);
  const [
    settingsOpened,
    { open: openSettingsDrawer, close: closeSettingsDrawer },
  ] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="Preferences"
        onClick={openSettingsDrawer}
      >
        <IconSettings
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
          color="gray"
        />
      </ActionIcon>
      <Drawer
        opened={settingsOpened}
        onClose={closeSettingsDrawer}
        title={
          <Text size="lg" fw={700}>
            Settings
          </Text>
        }
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Accordion variant="separated">
          <Accordion.Item value="photos">
            <Accordion.Control>Preferences</Accordion.Control>
            <Accordion.Panel>
              <FilterForm
                data={preferences}
                handleClose={closeSettingsDrawer}
                showPreferencesForm
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Drawer>
    </>
  );
};

export default Settings;
