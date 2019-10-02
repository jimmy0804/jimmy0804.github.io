function init_DataTables() {
   var table =  $("#upgradeTable").DataTable({
        ajax: "data/update.json",
        columns: [
            {
                data: null, render: function (data, type, row) {
                    return "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>";
                }
            },
            { "data": "name" },
            { "data": "location" },
            { "data": "ip" },
            { "data": "type" },
            {
                data: null, render: function (data, type, row) {
                    return '<a target="blank" href="' + data.versionURL + '">' + data.version + '</a>';
                }
            },
            { "data": "scheduled" },
            { "data": "Date" }
        ],
        initComplete: function () {
            this.api().columns([1, 2, 3, 4, 5, 6]).every(function () {
                var column = this;
                var select = $('<select ><option value="">Show all</option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                if (typeof column.data()[1] == 'object') {
                    column.data().map(item => item.version)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .each(function (a, b) {
                            select.append('<option value="' + a + '">' + a + '</option>')
                        })
                } else {
                    column
                        .data()
                        .unique()
                        .sort()
                        .each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });
                }
            })
            
        }
    })

    $('#upgradeTable tbody').on('click', 'tr', function () {
        var selectedRow = table.row(this).data();
        $('#machineName').text(selectedRow.name);
        $('#machineIP').text(selectedRow.ip);
        
        
     });

};

$(document).ready(function () {
    init_DataTables();
    //  $('#upgradeTable tbody').on( 'click', 'tr', function () {
    //     $(this).toggleClass('active');
    // } );
});

