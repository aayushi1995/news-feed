import React from 'react'
import { Skeleton } from "@mantine/core";


export const SkeletonLoader = (props) => {
    const emptyArray = new Array(10).fill();
    return (
      <>
        {emptyArray.map((_, index) => (
            <Skeleton key={index} mt={50} mb="xl" {...props}/>
        ))}
      </>
    );
  };
