import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Recipe from "@/interfaces/recipes";
import Link from "next/link";
import CoverImage from "../home/cover-image";
import { IoIosSearch } from "react-icons/io";

type Props = {
  allRecipes: Recipe[];
  className?: string;
};

export default function Search({ allRecipes, className }: Props) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let searchBarRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const handler = (e) => {
      if (!searchBarRef.current.contains(e.target)) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      setIsOpen(true);
    }
    console.warn(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  const handleChange = (e) => {
    setDebouncedSearchTerm(e.target.value);
  };

  const allSearchResults = allRecipes;
  let searchResults = allSearchResults;

  if (debouncedSearchTerm !== "") {
    searchResults = allSearchResults.filter((result) => {
      return result.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    });
  }
  const clearSearchTerm = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };
  const renderResults = () => {
    if (searchResults.length == 0) {
      return <div>Not Found</div>;
    }
    return searchResults.map((recipe) => (
      <div key={recipe.slug}>
        <Link
          href={`/recipes/${recipe.slug}`}
          className="flex hover:shadow-sm content-center items-center "
          onClick={clearSearchTerm}
        >
          <div className="w-16">
            <CoverImage
              title={recipe.title}
              src={recipe.coverImage}
              className="h-16 w-16 object-cover"
            />
          </div>
          <div className="ml-2 w-4/5">
            <p>{recipe.title}</p>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className={`relative z-0 md:w-70 ${className}`} ref={searchBarRef}>
      <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
        <IoIosSearch />
      </div>
      <input
        type="search"
        className="border border-1 rounded-lg outline-none h-12 w-full transition-all duration-300 ps-10"
        name="search"
        placeholder="Search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
        autoComplete="off"
      />

      {isOpen && debouncedSearchTerm.length > 0 && (
        <div
          id="SearchResults"
          className="absolute -z-10 flex-col bg-white p-1 shadow-md overflow-y-auto max-h-60 right-0 left-0 mx-8 md:mx-0"
        >
          {renderResults()}
        </div>
      )}
    </div>
  );
}
