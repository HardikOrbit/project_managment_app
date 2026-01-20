import React from "react";
import clsx from "clsx";

const TableCell = ({ as = "td", children, className = "", ...props }) => {
    const classes =
        as === "th"
            ? "ctm_th font-medium xl:text-base text-sm uppercase text-white bg-gray-400 dark:bg-[#171C2A] lg:py-2 py-1 xl:px-10 lg:px-8 px-6 text-start first:px-5 first:rounded-l-[4px] last:rounded-r-[4px] relative leading-normal after:absolute after:h-5 after:w-[2px] after:rounded-full after:bg-white after:right-0 after:top-1/2 after:transform after:translate-x-[-50%] after:translate-y-[-50%] last:after:relative text-nowrap cursor-pointer"
            : "text-normal xl:text-base text-sm text-[#3F3F3F] lg:py-[10px] py-2 xl:px-10 lg:px-8 px-6 first:px-5 text-start leading-normal relative after:absolute after:h-5 after:w-[2px] after:rounded-sm after:bg-[#D8D8D8] after:right-0 after:top-1/2 after:transform after:translate-x-[-50%] after:translate-y-[-50%] last:after:relative";

    const Component = as;

    return (
        <Component className={clsx(classes, className)} {...props}>
            {children}
        </Component>
    );
};

export default TableCell;
