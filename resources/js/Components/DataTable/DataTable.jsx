import React, { useEffect, useRef } from "react";
import $ from "jquery";

import "datatables.net";
import "datatables.net-responsive";

const DataTable = ({ id, children, head }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = $(tableRef.current).DataTable({
            dom: '<"top"r>t<"bottom ctm_table_footer flex items-center justify-between lg:px-[30px] lg:py-[15px] md:px-6 md:py-3 px-4 py-2 flex-wrap rounded-b-[10px] lg:-mx-[10px] -mx-2 gap-3 bg-white border-t border-gray-400"<"bottom_left"i><"bottom_right flex items-center gap-4 md:justify-end flex-wrap"lp>>',
            pageLength: 10,
            searching: false,
            ordering: false,
            info: true,
            responsive: true,
            lengthChange: true,
            paging: true,
            language: {
                paginate: {
                    previous: `
                        <svg width="20" height="20" class="lg:w-5 lg:h-5 w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M13.3333 18.6667L5 10.3333L13.3333 2L14.5 3.1875L7.35416 10.3333L14.5 17.4792L13.3333 18.6667Z" fill="currentColor"/>
                        </svg>
                    `,
                    next: `
                        <svg width="20" height="20" class="lg:w-5 lg:h-5 w-4 h-4" viewBox="0 0 20 20" fill="none">
                            <path d="M6.16666 18.6667L14.5 10.3333L6.16666 2L5 3.1875L12.1458 10.3333L5 17.4792L6.16666 18.6667Z" fill="currentColor"/>
                        </svg>
                    `,
                },
                lengthMenu: "Items per page : _MENU_",
            },
        });

        // Horizontal scroll wrapper
        $(tableRef.current)
            .closest("table.dataTable")
            .wrap('<div class="overflow-x-auto"></div>');

        return () => {
            table.destroy(true);
        };
    }, []);

    return (
        <div className="bg-white lg:px-[10px] lg:pt-[10px] px-2 pt-2 border bordergray-400 rounded-[10px] shadow-[1px_1px_9px_0px_#0000001A]">
            <table id={id} ref={tableRef} className="w-full">
                <thead>
                    <tr>{head}</tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
};

export default DataTable;
