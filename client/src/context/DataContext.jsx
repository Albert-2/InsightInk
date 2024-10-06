import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [taggedBlog, setTaggedBlog] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}/post/getblogpost`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const postData = await response.json();
        setData(postData.allPosts);
        const tagsArray = postData.allPosts.flatMap((post) => post.tags);
        const tagCounts = tagsArray.reduce((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {});

        // Convert tagCounts object to an array of objects
        const tagCountsArray = Object.entries(tagCounts).map(
          ([tag, count]) => ({ tag, count })
        );
        setTaggedBlog(tagCountsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, taggedBlog }}>
      {children}
    </DataContext.Provider>
  );
};
