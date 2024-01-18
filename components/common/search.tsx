import React, { useEffect, useMemo, useState } from 'react'
import debouce from "lodash.debounce";
import Recipe from '@/interfaces/recipes';
import Link from 'next/link';

type Props = {
  allRecipes: Recipe[];
};

export default function Search({ allRecipes }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const allSearchResults = allRecipes
  let searchResults = allSearchResults
  if (searchTerm !== '')
  {
    searchResults = allSearchResults.filter((result) => {
      return result.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  const renderResults = () => {
    return searchResults.map((recipe, i) => 
    <div>
      <Link key={i} href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
    </div>
    );
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
    <div className='relative z-0'>
      <input type="text" className='border border-1 rounded-lg outline-none w-72 h-12 p-6 transition-all duration-300 ' name="search" placeholder="Search" onChange={debouncedResults}/>
 
      <div id='SearchResults' className='absolute z-10 flex-col bg-slate-500 w-72 px-6'> 
        {searchTerm.length != 0 && renderResults()}
      </div>
    </div>
  );
};