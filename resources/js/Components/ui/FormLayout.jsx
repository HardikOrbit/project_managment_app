import React from "react";

export default function FormLayout({ children }) {
    return (
        <div className="bg-white dark:bg-[#252525] border shadow-[1px_1px_9px_0px_#0000001A] xl:p-[30px] lg:p-7 md:p-6 p-4 rounded-[10px] ctm_form_main_section">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-x-10 lg:gap-y-8 md:gap-x-8 md:gap-y-6 gap-x-6 gap-y-4">
                {children}
            </div>
        </div>
    );
}
