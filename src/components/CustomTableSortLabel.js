import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

export default function CustomTableSortLabel ({ active, direction, onClick, children }) {
    return (
      <button
        onClick={onClick}
        className="flex justify-center items-center space-x-1 cursor-pointer focus:outline-none"
      >
        {children}
        {active && (
          <span className="ml-1">
            {direction === 'asc' ? <IoIosArrowRoundUp className="h-4 w-4" /> : <IoIosArrowRoundDown className="h-4 w-4" />}
          </span>
        )}
      </button>
    );
  };