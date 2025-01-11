import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs/promises';
import fsn from 'fs';
import { extname, join } from 'path';

let mainWindow;

// Function to create the Electron window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  // Allow Node.js integration in renderer
      contextIsolation: false, // Disable context isolation for using require in renderer
    },
  });

  mainWindow.loadFile('index.html'); // Load your HTML file
}

// App initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handler for selecting a folder
ipcMain.handle('select-folder', async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'], // Only allow directory selection
    });

    if (result.filePaths.length > 0) {
      return result.filePaths[0]; // Return the selected folder path
    } else {
      return null; // No folder selected
    }
  } catch (err) {
    console.error('Error opening folder dialog:', err);
    return null; // Return null on error
  }
});

// IPC handler for cleaning a folder (move files based on extension)
ipcMain.handle('clean-folder', async (event, folderPath) => {
  try {
    let files = await fs.readdir(folderPath); // Read files in the folder
    let ext = files.map(file => extname(file).slice(1)); // Get the extensions of the files

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let extensions = ext[i];
      let folderpath = join(folderPath, extensions); // Path for the folder based on extension

      if (extensions === "java" || extensions === "json") {
        continue; // Skip these extensions if needed
      }

      if (fsn.existsSync(folderpath)) {
        // If folder exists, move the file
        let sourcePath = join(folderPath, file);
        let destinationPath = join(folderpath, file);
        await fs.rename(sourcePath, destinationPath);
      } else {
        // If folder doesn't exist, create it and then move the file
        await fs.mkdir(folderpath, { recursive: true });
        let sourcePath = join(folderPath, file);
        let destinationPath = join(folderpath, file);
        await fs.rename(sourcePath, destinationPath);
      }
    }

    return 'Folder cleaning complete!'; // Return success message

  } catch (err) {
    console.error('Error during folder cleaning:', err);
    return 'Error during folder cleaning.';
  }
});
