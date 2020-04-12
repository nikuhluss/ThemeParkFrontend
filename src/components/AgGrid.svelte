<script>

    import { onMount, onDestroy } from 'svelte';

    export let columns = {};
    export let data = [];

    let container;
    let gridOptions;

    onMount(() => {
        if (!container) {
            return;
        }

        gridOptions = {
            defaultColDef: { resizable: true },
            columnsDef: [],
            rowData: [],
        };

        new agGrid.Grid(container, gridOptions);
    });

    onDestroy(() => {
        if (gridOptions && gridOptions.api) {
            gridOptions.api.destroy();
        }
    });

    $: if (columns && gridOptions && gridOptions.api) {
        gridOptions.api.setColumnDefs(columns);
        gridOptions.api.sizeColumnsToFit();
    }

    $: if (data && gridOptions && gridOptions.api) {
        gridOptions.api.setRowData(data);
        gridOptions.api.sizeColumnsToFit();
    }

    export const exportCSV = (fileName = null) => {
        gridOptions.api.exportDataAsCsv({ fileName });
    }

</script>

<div bind:this={container} class="ag-theme-balham" />

<style>
    div {
        width: 100%;
        height: 600px;
    }
</style>