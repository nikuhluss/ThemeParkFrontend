<script>
    import { onMount } from 'svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';
    import AgGrid from '../components/AgGrid.svelte';

    // list of available reports

    let availableReports = [
        {
            name: "Ride reviews",
            report: "ride_reviews",
            columns: [
                { headerName: "Ride identifier", field: "ride_id" },
                { headerName: "Ride name", field: "ride_name" },
                { headerName: "Total reviews", field: "review_count" },
                { headerName: "Average", field: "review_avg" },
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
                { headerName: "Scan count", field: "scan_count" },
            ]
        },
        {
            name: "Ride maintenance cases per-month",
            report: "ride_maintenance_monthly",
            columns: [
                { headerName: "Year", field: "year" },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Ride identifier", field: "ride_id" },
                { headerName: "Ride name", field: "ride_name" },
                { headerName: "Started maintenance", field: "maintenance_start_total" },
                { headerName: "Closed maintenance", field: "maintenance_end_total" },
            ]
        },
        {
            name: "Most frequently ridden rides per-month",
            report: "frequently_ridden_rides",
            columns: [
                { headerName: "Year", field: "year" },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Ride identifier", field: "ride_id" },
                { headerName: "Ride name", field: "ride_name" },
                { headerName: "Times ridden", field: "times_ridden" },
            ]
        },
        {
            name: "Rainout per-month",
            report: "rainouts",
            columns: [
                { headerName: "Year", field: "year" },
                // { headerName: "Month", field: "month" },
                { headerName: "Month name", field: "month_name" },
                { headerName: "Total rainout", field: "total_rainout" },
            ]
        }
    ];

    // report fetching

    let currentReport = availableReports[0];
    let currentReportData = [];

    const fetchReportData = async (report) => {

        if (!report) {
            return;
        }

        const axios = makeAxiosWithKey($key, 'http://localhost:5050');

        try {
            const response = await axios.get(`/_QUERIES/reports/${report.report}`);
            currentReportData = response.data;
        } catch (err) {
            console.error(err);
        }
    };

    $: fetchReportData(currentReport);

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
    </div>
</div>

{#if !currentReport}
    <p>No report has been selected.</p>
{:else}
    <AgGrid columns={currentReport.columns} data={currentReportData} />
{/if}

<style>
</style>
