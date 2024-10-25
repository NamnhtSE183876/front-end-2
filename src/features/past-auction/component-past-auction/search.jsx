import { Input } from "antd";

function Search() {
  return (
    <div className="mt-[10px] ml-10 flex items-baseline">
      <h1 className="text-white">Search</h1>
      <Input type="text" className="h-[20px] w-[300px] ml-2" />
    </div>
  );
}

export default Search;
