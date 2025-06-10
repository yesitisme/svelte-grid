<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let columns = [];
  export let data = [];
  export let apiEndpoint = "";
  export let theme = "bootstrap";
  export let pageSize = 10;
  export let sortable = true;

  let rows = [];
  let currentPage = 1;
  let sortField = "";
  let sortDir = "asc";
  let loading = false; // ✅ NEW
  let error = "";
  $: pagedRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const classMap = {
    bootstrap: {
      table: "table table-striped",
      th: "text-nowrap",
      td: "",
      btn: "btn btn-sm btn-outline-primary",
      msg: "text-muted mt-2",
    },
    tailwind: {
      table: "min-w-full divide-y divide-gray-200",
      th: "px-4 py-2 text-left text-sm font-medium text-gray-700",
      td: "px-4 py-2 text-sm text-gray-900",
      btn: "bg-blue-500 text-white px-2 py-1 rounded text-sm",
      msg: "text-gray-500 text-sm mt-2",
    },
    material: {
      table: "mdc-data-table__table",
      th: "mdc-data-table__header-cell",
      td: "mdc-data-table__cell",
      btn: "mdc-button mdc-button--outlined",
      msg: "mdc-typography--body2 mt-2",
    }
  };

  onMount(async () => {
    if (apiEndpoint) {
      loading = true;
      try {
        const res = await fetch(apiEndpoint);
        const json = await res.json();
        rows = json.data || json;
      } catch (e) {
        error = "Failed to load data.";
      } finally {
        loading = false;
      }
    } else {
      rows = data;
    }
  });

  function sortBy(key) {
    if (!sortable) return;
    sortField = key;
    sortDir = sortDir === "asc" ? "desc" : "asc";
    rows.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      return sortDir === "asc"
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  }
</script>

<table class="{classMap[theme].table}">
  <thead>
    <tr>
      {#each columns as col}
        <th class="{classMap[theme].th}" on:click={() => sortBy(col.key)}>
          {col.label}
          {#if sortable && col.key === sortField}
            {sortDir === "asc" ? " 🔼" : " 🔽"}
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each pagedRows as row}
      <tr>
        {#each columns as col}
          <td class="{classMap[theme].td}">
            {col.format ? col.format(row[col.key]) : row[col.key]}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

{#if loading}
  <div class="{classMap[theme].msg}">🔄 Loading...</div>
{:else if pagedRows.length === 0}
  <div class="{classMap[theme].msg}">⚠️ No records found.</div>
{/if}
{#if error}
  <div class="{classMap[theme].msg}">❌ {error}</div>
{/if}

<div class="mt-2">
  <button class="{classMap[theme].btn}" on:click={() => currentPage--} disabled={currentPage === 1}>Prev</button>
  <span class="mx-2">Page {currentPage}</span>
  <button class="{classMap[theme].btn}" on:click={() => currentPage++} disabled={(currentPage * pageSize) >= rows.length}>Next</button>
</div>