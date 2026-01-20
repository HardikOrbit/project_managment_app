import React from "react";

export default function PageHeadingTitle({ title, className = "" }) {
    return (
        <div className={className}>
            <h2 className="text-black dark:text-white font-semibold lg:text-2xl md:text-xl text-lg inline">
                {title}
            </h2>
        </div>
    );
}
