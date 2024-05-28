import React from "react";
import { Flex } from "@mantine/core";
import Logo from "../../assets/logo.svg";
import "./Navigation.css";
import Settings from "../Settings";
import FilterSection from "../FilterSection";

const Navigation = () => {
  return (
    <Flex
      display={"flex"}
      justify={"space-between"}
      align={"center"}
      className={"navigationWrapper"}
    >
      <Settings />
      <img src={Logo} />
      <FilterSection />
    </Flex>
  );
};

export default Navigation;
