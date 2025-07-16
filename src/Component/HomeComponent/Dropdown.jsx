import { useContext, useState } from 'react';
import { ContextAPI } from '../ContextAPI/AuthProvider';

const Dropdown = () => {
  const {handleMainDropdown} = useContext(ContextAPI);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="text-white secondarybg focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={handleToggle}
      >
        Filter by Age
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdownHover"
        className={`z-10 ${isOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
      >
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
            <li><button onClick={() =>handleMainDropdown("asc")}>Ascending</button></li>
            <li><button onClick={()=>handleMainDropdown("dsc")}>Descending</button></li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;