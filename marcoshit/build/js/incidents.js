var selected_Incidents = {};
var patch_event_table = $('#patch_event').DataTable({ "ordering": false, "paging": false, "searching": false });
var patch_status = 'Unreviewed';
var event_history = {};
var history_Table = '';
var review_date = '';
var patch_request_date = '';
var isResovled = false;

// function init_SmartWizard() {
//     if (typeof ($.fn.smartWizard) === 'undefined') { return; }
//     $('#wizard').smartWizard({
//         hideButtonsOnDisabled: true,
//         selected: 2,
//         keyNavigation: false,
//         enableAllSteps: true,
//         labelNext: 'Next',
//         transitionEffect: 'slide',
//         labelFinish: '',
//         transitionEffect: 'none'
//     });

//     $('#wizard').smartWizard('disableStep', '4');
//     $('#wizard').smartWizard('disableStep', '5');

//     $('.buttonPrevious').addClass('btn btn-default');
//     $('.buttonNext').addClass('btn btn-primary');
// };


/* DATA TABLES */


function init_DataTables() {
    $('#Incident_Details_Panel').hide();
    if (typeof ($.fn.DataTable) === 'undefined') { return; }
    var handleDataTableButtons = function () {
        if ($("#datatable-responsive").length) {
            var table = $("#datatable-responsive").DataTable({
                ajax: "data/incidents_Data.json",
                dom: "Blfrtip",
                columns: [
                    { "data": "Severity" },
                    { "data": "Incident_ID" },
                    { "data": "Incident_Name" },
                    { "data": "Source" },
                    { "data": "Destination" },
                    { "data": "Incident_Time" },
                    { "data": "Process" }
                ],
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm"
                    },
                    {
                        extend: "csv",
                        className: "btn-sm"
                    },
                    {
                        extend: "excel",
                        className: "btn-sm"
                    },
                    {
                        extend: "pdfHtml5",
                        className: "btn-sm"
                    },
                    {
                        extend: "print",
                        className: "btn-sm"
                    }
                ],
                responsive: true,
                createdRow: function (row, data, index) {
                    var node = document.createElement("span");
                    var Dangernode = document.createTextNode("High");
                    node.appendChild(Dangernode);
                    node.classList.add("label", "label-danger");

                    var Mnode = document.createElement("span");
                    var MediumNode = document.createTextNode("Medium");
                    Mnode.appendChild(MediumNode);
                    Mnode.classList.add("label", "label-warning");
                    


                    if (data.Severity >= 10) {
                        console.log($('td', row));
                        $('td', row).eq(0).prepend(node);
                    }
                    if (data.Severity == 9) {
                        console.log($('td', row));
                        $('td', row).eq(0).prepend(Mnode);
                    }
                }
            });


        }

        //datatable on click
        $('#datatable-responsive tbody').on('click', 'tr', function () {
            $('#selectIncidentBtn').click();
            
            $('#Incident_Details_Panel').show();
            selected_Incidents = table.row(this).data();
            review_date = moment().format('lll');
            $('#review_date').text(review_date);
            var title = selected_Incidents.Incident_ID + ' - ' + selected_Incidents.Incident_Name;
            console.log(title);
            $('#incident_title').text(title);
            document.getElementById('incident_ID').innerHTML = selected_Incidents.Incident_ID;
            document.getElementById('Destination').innerHTML = selected_Incidents.Destination;
            document.getElementById('Severity').innerHTML = selected_Incidents.Severity;
            document.getElementById('Source').innerHTML = selected_Incidents.Source;
            document.getElementById('Incident_Time').innerHTML = selected_Incidents.Incident_Time;
            document.getElementById('Incident_Desc').innerHTML = selected_Incidents.Incident_Desc;
            document.getElementById('Remedation').innerHTML = selected_Incidents.Remedation;

            updateHistory(review_date, "Client reviewed", "Joe Doe");

            $('#incidents_Table')
                .css('height', 'auto')
                .find('.collapse-link i').toggleClass('fa-chevron-up fa-chevron-down').end()
                .find('.x_content').slideToggle(300);
        });

    };

    history_Table = $("#event_history").DataTable({
        ajax: "data/history.json",
        columns: [
            { "data": "time" },
            { "data": "action" },
            { "data": "user" },
            { "data": "note" }
        ],
        "ordering": false, "paging": false, "searching": false
    });

    $("#datatable-event").DataTable({
        ajax: "data/event_data.json",
        columns: [
            { "data": "Recived" },
            { "data": "Type" },
            { "data": "Name" },
            { "data": "Reporting" },
            { "data": "User" }
        ]
    });

    TableManageButtons = function () {
        "use strict";
        return {
            init: function () {
                handleDataTableButtons();
            }
        };
    }();

    TableManageButtons.init();
};

var checked = false;
function checkboxes() {
    if (checked) {
        checked = false;
        $('#number_of_pending').text("0 ");
    } else {
        checked = true;
        $('#number_of_pending').text("1 ");
    }
}


function apply(action) {
    var approver = '';
    var request_patch_time = '';
    var request_message = '';
    var request_time = moment().format('lll');
    var message = '';

    // console.log($('#users').val());
    // console.log($('#gridRadios1').is(':checked'));
    // console.log($('#gridRadios2').is(':checked'));
    if ($('#myDatepicker').data("DateTimePicker").date()) {
        request_patch_time = $('#myDatepicker').data("DateTimePicker").date().format('lll');
    }
    // console.log(request_patch_time);
    approver = $('#users').val()


    if (action == 'override') {
        request_message = 'Override permission to approve a patch';
        patch_status = 'Overrided';
    } else {
        request_message = 'Approval request submit to ' + approver;
        patch_status = 'Pending Approval';
    }

    patch_event_table.row.add([
        request_time, '320094', request_message, '10.50.30.52 (rwdc2.techcom.com)', 'Ken Smith'
    ]).draw(false);

    $('#patch_status').text(patch_status);

    //Override permission
    if (action == 'override') {
        //Future time
        if ($('#gridRadios2').is(':checked')) {
            setTimeout(
                function () {
                    patch_event_table.row.add([
                        moment().format('lll'), '320095', 'Scheduled patching on ' + request_patch_time, '10.50.30.52 (rwdc2.techcom.com)', 'System'
                    ]).draw(false);
                }, 2000);
        } else {
            //ASAP
            setTimeout(
                function () {
                    patch_event_table.row.add([
                        moment().format('lll'), '320096', 'Start download patch', '10.50.30.52 (rwdc2.techcom.com)', 'System'
                    ]).draw(false);
                }, 7000);
        }
    }

    updateHistory(request_time, request_message, "Joe Doe");
}

function updateHistory(a, b, c) {
    history_Table.row.add({ "time": a, "action": b, "user": c, "note": '' }).draw(false);
}

function addTwoBtn() {
    var $input = $('<div id="twoBtn" class="col-md-9 col-md-offset-2"> <a href="#"  type="submit" class="btn btn-primary">Export</a><a href="#"  type="submit" class="btn btn-primary">Add to case</a> <a href="#"  type="submit" class="btn btn-success">Escalate to SOC</a></div>');
    $input.appendTo($('div.actionBar'));
}

$(document).ready(function () {
    // init_SmartWizard();
    init_DataTables();
    $('#number_of_pending').text("0 ");
    $('#patch_status').text(patch_status);
    $('#myDatepicker').datetimepicker({
        ignoreReadonly: true,
        allowInputToggle: false
    });
    // console.log($('#Approved_date').text());
    // $('.buttonNext').click(function () {
    //     if ($("#wizard").smartWizard('currentStep') == 4 && !isResovled) {
    //         $('.buttonNext').text('Mark as resolved');
    //     }

    //     if ($("#wizard").smartWizard('currentStep') == 5 && $('#Approved_date').text() == "") {

    //         $('#Approved_date').text(moment().format('lll') + " by Ken Smith");
    //         $('#Resolved_date').text(moment().format('lll'));
    //         if (!isResovled) {
    //             addTwoBtn();
    //         }
    //         console.log($('#twoBtn'));
    //         isResovled = true;
    //     }
    //     if (isResovled) {
    //         $('#twoBtn').show();
    //     }
    // });

    // $('.buttonPrevious').click(function () {
    //     if ($("#wizard").smartWizard('currentStep') == 4 && isResovled) {
    //         $('#twoBtn').hide();
    //     }
    // })
});

