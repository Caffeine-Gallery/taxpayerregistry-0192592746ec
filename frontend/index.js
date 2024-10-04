import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const taxpayerForm = document.getElementById('taxpayer-form');
    const searchForm = document.getElementById('search-form');
    const taxpayersList = document.getElementById('taxpayers');
    const searchResult = document.getElementById('search-result');

    // Function to add a new taxpayer
    taxpayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taxpayer = {
            tid: document.getElementById('tid').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value
        };
        await backend.addTaxPayer(taxpayer);
        taxpayerForm.reset();
        await loadTaxpayers();
    });

    // Function to search for a taxpayer
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('search-tid').value;
        const result = await backend.searchTaxPayer(tid);
        if (result.length > 0) {
            const taxpayer = result[0];
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p>TID: ${taxpayer.tid}</p>
                <p>Name: ${taxpayer.firstName} ${taxpayer.lastName}</p>
                <p>Address: ${taxpayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No taxpayer found with that TID.</p>';
        }
    });

    // Function to load and display all taxpayers
    async function loadTaxpayers() {
        const taxpayers = await backend.getAllTaxPayers();
        taxpayersList.innerHTML = '';
        taxpayers.forEach(tp => {
            const li = document.createElement('li');
            li.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName} - ${tp.address}`;
            taxpayersList.appendChild(li);
        });
    }

    // Initial load of taxpayers
    await loadTaxpayers();
});
