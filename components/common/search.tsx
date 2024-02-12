import React, { useEffect, useMemo, useState } from "react";
import debouce from "lodash.debounce";
import Recipe from "@/interfaces/recipes";
import Link from "next/link";
import CoverImage from "../home/cover-image";

type Props = {
  allRecipes: Recipe[];
};

export default function Search({ allRecipes }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const allSearchResults = allRecipes;
  let searchResults = allSearchResults;
  if (searchTerm !== "") {
    searchResults = allSearchResults.filter((result) => {
      return result.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  const renderResults = () => {
    if (searchResults.length == 0) {
      return <div>Not Found</div>;
    }
    return searchResults.map((recipe) => (
      <div key={recipe.slug}>
        <Link
          href={`/recipes/${recipe.slug}`}
          className="flex hover:shadow-sm content-center"
        >
          <CoverImage
            title={recipe.title}
            src={recipe.coverImage}
            className="h-16 w-16 object-cover"
          />
          <p className="ml-2">{recipe.title}</p>
        </Link>
      </div>
    ));
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className="relative z-0">
      <input
        type="search"
        className="border border-1 rounded-lg outline-none w-80 h-12 p-6 transition-all duration-300 "
        name="search"
        placeholder="Search"
        onChange={debouncedResults}
      />

      {searchTerm.length > 0 && (
        <div
          id="SearchResults"
          className="absolute -z-10 flex-col bg-white w-full py-1 shadow-md overflow-y-auto h-60"
        >
          {renderResults()}
        </div>
      )}
    </div>
  );
}
