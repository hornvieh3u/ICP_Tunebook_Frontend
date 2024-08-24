export default {
  button: {
    primary: {
      base: "text-white bg-primary border border-transparent text-xs",
      active:
        "active:bg-yellow-700 hover:bg-yellow-600 focus:ring focus:ring-yellow-500",
      disabled: "opacity-50 cursor-not-allowed",
    },
    outline: {
      base: "text-white bg-primary border border-stone-500 text-xs",
      active:
        "active:bg-yellow-700 hover:bg-yellow-600 focus:ring focus:ring-yellow-500",
      disabled: "opacity-50 cursor-not-allowed",
    },
  },
  card: {
    default:
      "bg-gray dark:bg-primary hover:shadow-[0_0_2px_#ec4,inset_0_0_2px_#ec4,0_0_5px_#ec4,0_0_12px_#ec4]",
  },
  modal: {
    base: "w-full px-6 py-4 overflow-hidden rounded-t-lg bg-background sm:rounded-lg sm:m-4 sm:max-w-xl",
  },
  modalFooter: {
    base: "flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-secondary",
  },
  input: {
    base: "block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md",
    active:
      "focus:border-purple-400 border-primary dark:border-primary focus:ring focus:ring-primary dark:focus:border-primary dark:focus:ring-primary dark:bg-primary",
    disabled: "cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800",
    valid:
      "border-green-600 dark:bg-primary focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200",
    invalid:
      "border-red-600 dark:bg-primary focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200",
    radio:
      "text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-offset-0 dark:focus:ring-gray-300",
    checkbox:
      "text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-offset-0 rounded dark:focus:ring-gray-300",
  },
  dropdown: {
    base: "absolute w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-yellow-300 dark:bg-primary z-50",
    align: {
      left: "left-0",
      right: "right-0",
    },
  },
};
