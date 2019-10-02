/* DATA TABLES */
function init_DataTables() {
    if (typeof ($.fn.DataTable) === 'undefined') { return; }


    console.log("Running");
    var table = $("#allReport_Table").DataTable({
        ajax: "data/report.json",
        columns: [
            { "data": "Date" },
            { "data": "Name" },
            { "data": "Action" }
        ],
        responsive: true,
        "ordering": false, "paging": false, "searching": false
    });
}

$(document).ready(function () {
    init_DataTables();
});

