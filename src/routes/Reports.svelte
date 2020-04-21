<script>
    import { onMount } from 'svelte';
    import { location, replace, querystring } from 'svelte-spa-router';
    import qs from 'qs';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';
    import AgGrid from '../components/AgGrid.svelte';

    let agComponent;

    // list of available reports

    let availableReports = [
        {
            name: "Ride reviews",
            report: "ride_reviews",
            columns: [
                { headerName: "Ride identifier", field: "ride_id" },
                { headerName: "Ride name", field: "ride_name" },
                { headerName: "Total reviews", field: "review_count", sortable: true },
                { headerName: "Average", field: "review_avg", sortable: true },
            ]
        },
        {
            name: "Customer ticket scans",
            report: "customer_scan_count",
            columns: [
                { headerName: "User identifier", field: "user_id" },
                { headerName: "Email", field: "user_email" },
                { headerName: "First name", field: "user_first_name" },
                { headerName: "Last name", field: "user_last_name" },
                { headerName: "Scan count", field: "scan_count", sortable: true },
            ]
        },
        {
            name: "Ride maintenance cases per-month",
            report: "ride_maintenance_monthly",
            hasDateRangeFilter: true,
            columns: [
                { headerName: "Year", field: "year", sortable: true },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Ride identifier", field: "ride_id" },
                { headerName: "Ride name", field: "ride_name" },
                { headerName: "Started maintenance", field: "maintenance_start_total", sortable: true },
                { headerName: "Closed maintenance", field: "maintenance_end_total", sortable: true },
            ]
        },
        {
            name: "Most frequently ridden rides per-month",
            report: "frequently_ridden_rides_monthly",
            hasDateRangeFilter: true,
            columns: [
                { headerName: "Year", field: "year", sortable: true },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Ride identifier", field: "ride_id" },
                { headerName: "Ride name", field: "ride_name" },
                { headerName: "Times ridden", field: "times_ridden", sortable: true },
            ]
        },
        {
            name: "Rainout per-month",
            report: "rainouts_monthly",
            hasDateRangeFilter: true,
            columns: [
                { headerName: "Year", field: "year" },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Total rainout", field: "total_rainout", sortable: true },
            ]
        },
        {
            name: "Revenue per-month",
            report: "revenue_maintenance_vs_tickets",
            hasDateRangeFilter: true,
            columns: [
                { headerName: "Year", field: "year" },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Ticket sales", field: "ticket_sales"},
                { headerName: "Maintenance costs", field: "maintenance_costs"},
                { headerName: "Revenue", field: "revenue"},
            ]
        }
    ];

    // report fetching

    $: queryobj = qs.parse($querystring);
    $: queryreport = queryobj && queryobj.report || null;
    $: currentReport = queryreport && availableReports.find(r => r.report === queryreport) || availableReports[0];

    let currentReportData = [];
    let start_filter = '';
    let end_filter = '';

    const fetchReportData = async (report, start_filter, end_filter) => {
        if (!report) {
            return;
        }

        const reportsUrl = 'http://' + process.env.PREST_HOST;
        const axios = makeAxiosWithKey($key, reportsUrl);

        let url = `/_QUERIES/reports/${report.report}`;
        let queryParams = [];

        if (report.hasDateRangeFilter && start_filter) {
            queryParams.push(`start=${start_filter}`);
        }

        if (report.hasDateRangeFilter && end_filter) {
            queryParams.push(`end=${end_filter}`);
        }

        const finalUrl = `${url}?${queryParams.join('&')}`;
        try {
            const response = await axios.get(finalUrl);
            currentReportData = response.data;
        } catch (err) {
            console.error(err);
        }
    };

    $: fetchReportData(currentReport, start_filter, end_filter);

    // report selection and query string update

    $: selectedReport = queryreport && availableReports.find(r => r.report === queryreport) || availableReports[0];

    const handleReportChange = () => {
        replace($location + '?' + qs.stringify({report: selectedReport.report}));
    };

    // report refresh

    const refreshReportData = async () => {
        fetchReportData(currentReport, start_filter, end_filter);
    };

    // csv export

    const handleCSVExport = () => {
        if (!agComponent) { return; }
        agComponent.exportCSV(`${currentReport.report}.csv`);
    };

</script>

<h1 class="title">Reports</h1>
<h2 class="subtitle">Select the report you wish to view</h2>

<div class="level">
    <div class="level-left">
        <div class="level-item">
            <select class="select" bind:value={selectedReport} on:change={handleReportChange}>
                {#each availableReports as report}
                    <option value={report}>{report.name}</option>
                {/each}
            </select>
        </div>

        <div class="level-item">
            <div class="field">
                <div class="control">
                    <button class="button is-small" on:click={refreshReportData}>Refresh</button>
                </div>
            </div>
        </div>

        {#if currentReport && currentReport.hasDateRangeFilter }
        <div class="level-item">
            <div class="field has-addons">
                <div class="control">
                    <span class="button is-static is-small">Start</span>
                </div>
                <div class="control">
                    <input class="input is-small" type="date" bind:value={start_filter} />
                </div>
            </div>
        </div>

        <div class="level-item">
            <div class="field has-addons">
                <div class="control">
                    <span class="button is-static is-small">End</span>
                </div>
                <div class="control">
                    <input class="input is-small" type="date" bind:value={end_filter} />
                </div>
            </div>
        </div>
        {/if}
    </div>

    <div class="level-right">
        <div class="level-item">
            <div class="control">
                <button class="button is-link is-small" on:click={handleCSVExport}>Export to .CSV</button>
            </div>
        </div>
    </div>
</div>

{#if !currentReport}
    <p>No report has been selected.</p>
{:else}
    <AgGrid columns={currentReport.columns} data={currentReportData} bind:this={agComponent}/>
{/if}

<style>
</style>
