<script>
  import DataGrid from './lib/DataGrid.svelte';
  import { writable } from 'svelte/store';

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" }
  ];

  const apiEndpoint = "http://localhost:8000/api/users";
  // Example API endpoint, replace with your actual endpoint
  // const apiEndpoint = "https://jsonplaceholder.typicode.com/users";
  // const apiEndpoint = "https://api.example.com/users";
  let theme = "tailwind"; // start with Tailwind
</script>

<h1>User Grid</h1>

<label for="theme">Theme: </label>
<select id="theme" bind:value={theme}>
  <option value="tailwind">Tailwind</option>
  <option value="bootstrap">Bootstrap</option>
  <option value="material">Material</option>
</select>

<DataGrid {columns} {apiEndpoint} {theme} pageSize={5} />