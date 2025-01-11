# Electron Folder Cleaner

# About
The Electron Folder Cleaner is a desktop application built using Electron.js. It helps users organize and declutter their folders by sorting files based on their extensions. With a simple and intuitive interface, the app enables users to select a folder, automatically identify file types, and move files into corresponding extension-named folders.

This application is ideal for users who frequently manage large collections of files and want to maintain a clean and organized workspace.

# Features:

**Select Folder:** Allows users to select the folder they wish to clean and organize.  

**Automatic Sorting:** Groups files by their extensions and moves them into appropriately named folders.  

**User-Friendly Interface:** Provides a simple and clean UI for seamless interaction.  

**Cross-Platform:** Works on Windows, macOS, and Linux.  


# Technologies Used
**Electron.js:** For building the cross-platform desktop application.  

**Node.js:** For file system operations such as reading directories and moving files.  

**JavaScript:** Core scripting for app functionality.  

**HTML & CSS:** For creating the user interface.  


# How It Works
Launch the app by clicking the executable file.  

Click on the Select Folder button to choose the folder you want to organize.  

The app scans the folder and creates subfolders for each file extension.  

Files are automatically moved into their respective folders based on their extensions.  

# How to Run
**Development**  

Clone the repository:
bash  

Copy code
git clone https://github.com/mathuraayush/electron-folder-cleaner.git
cd electron-folder-cleaner  

Install the dependencies:
bash
Copy code
npm install  

Start the application:
bash
Copy code
npm start  

# Production
Download the latest release from the Releases section of this repository. Simply run the executable for your platform.  


# Planned Features
Add a "Preview Changes" feature to let users see the organization plan before executing it.  

Allow users to define custom rules for file sorting (e.g., by size, creation date).  

Localization support for multiple languages.  

# Contributing
Contributions are welcome! Feel free to open issues for bugs, suggest new features, or submit pull requests.
