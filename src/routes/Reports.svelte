<script>
    import { onMount } from 'svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';
    import AgGrid from '../components/AgGrid.svelte';

    let CSV;
    let agComponent;
    onMount(async () => {
        CSV = function(){
            agComponent.exportCSV();
        }
    });

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
            hasSinceFilter: true,
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
            hasSinceFilter: true,
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
            hasSinceFilter: true,
            columns: [
                { headerName: "Year", field: "year" },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Total rainout", field: "total_rainout", sortable: true },
            ]
        }
    ];

    // report fetching

    let currentReport = availableReports[0];
    let currentReportData = [];
    let since = '';

    const fetchReportData = async (report, since) => {

        if (!report) {
            return;
        }

        const axios = makeAxiosWithKey($key, 'http://localhost:5050');

        let url = `/_QUERIES/reports/${report.report}`;
        if (report.hasSinceFilter && since) {
            url = `${url}?since=${since}`;
        }

        try {
            const response = await axios.get(url);
            currentReportData = response.data;
        } catch (err) {
            console.error(err);
        }
    };

    $: fetchReportData(currentReport, since);

    

</script>

<h1 class="title">Reports</h1>
<h2 class="subtitle">Select the report you wish to view</h2>

<div class="level">
    <div class="level-left">
        <div class="level-item">
            <select class="select" bind:value={currentReport}>
                {#each availableReports as report}
                    <option value={report}>{report.name}</option>
                {/each}
            </select>
        </div>
        <div class="level-item">
            <button class="button" on:click={CSV}>Export to .CSV</button>
            
        </div>
    </div>

    {#if currentReport && currentReport.hasSinceFilter }
    <div class="level-right">
        <div class="level-item">
            <div class="field has-addons">
                <div class="control">
                    <span class="button is-static is-small">Since</span>
                </div>
                <div class="control">
                    <input class="input is-small" type="date" bind:value={since} />
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>

{#if !currentReport}
    <p>No report has been selected.</p>
{:else}
    <AgGrid columns={currentReport.columns} data={currentReportData} bind:this={agComponent}/>
{/if}

<style>
</style>
