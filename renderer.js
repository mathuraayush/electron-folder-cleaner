const { ipcRenderer } = require('electron');

const selectFolderBtn = document.getElementById('selectFolderBtn');
const cleanFolderBtn = document.getElementById('cleanFolderBtn');
const folderPathText = document.getElementById('folderPath');
const statusText = document.getElementById('status');

// Handle folder selection
selectFolderBtn.addEventListener('click', async () => {
  try {
    // Open folder dialog and get selected folder path
    const folderPath = await ipcRenderer.invoke('select-folder');
    if (folderPath) {
      folderPathText.textContent = `Selected folder: ${folderPath}`;
      cleanFolderBtn.disabled = false; // Enable the Clean Folder button
    } else {
      folderPathText.textContent = 'No folder selected.';
    }
  } catch (err) {
    console.error('Error selecting folder:', err);
  }
});

// Handle cleaning the folder
cleanFolderBtn.addEventListener('click', async () => {
  const folderPath = folderPathText.textContent.replace('Selected folder: ', '');
  
  // Perform the cleaning task
  statusText.textContent = 'Cleaning in progress...';
  const result = await ipcRenderer.invoke('clean-folder', folderPath);
  statusText.textContent = result; // Update status message when done
});
