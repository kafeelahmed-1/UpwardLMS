import { useState } from "react";
import SearchIcon from "../../assets/searchIcon.svg";
const SearchField = ({ onSearch }) => {
  const [search, setSearch] = useState();
  /*  console.log('search value :' , search); */

  const handleSearch = (event) => {
    let name = event.target.value;
    setSearch(name);
    onSearch(name);
  };
  
  // const handleKeyPress = (event) => {
  //   onSearch(search, event.key);
  // };

  return (
    <>
      <div className="border border-secondary w-[335px] h-[40px] py-[10px] px-3 bg-default rounded-lg placeholder:text-sm text-textSecondary self-center flex gap-x-2">
        <img src={SearchIcon} alt="" />
        <input
          type="text"
          className="bg-transparent outline-none placeholder:text-sm w-[335px]  "
          placeholder="Search by Keyword"
          onChange={handleSearch}
          value={search}
          // onKeyDown={handleKeyPress}
          autoFocus={false}
        />
      </div>
    </>
  );
};

export default SearchField;
