import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!search) return;

    if (search.length < 3) {
        return toast.error('Search term must be at least 3 characters long');
    }

    // Check if conversation data is available and is an array
    if (!conversation || !Array.isArray(conversation)) {
        return toast.error('Conversations data is not available');
    }

    // Find the conversation where the full name includes the search term
    const foundConversation = conversation.find(c =>
        c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    // Check if a conversation was found
    if (foundConversation) {
        setSelectedConversation(foundConversation);
    } else {
        toast.info('No matching conversation found');
    }
};


  return (
    <form onSubmit={handleSubmit} className=" flex items-center gap-2">
      <input
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-circle bg-sky-500 text-white" type="submit">
        <IoSearchSharp className=" w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
