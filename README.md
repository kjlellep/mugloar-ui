# Dragons of Mugloar Frontend

A Vue.js web application for playing the [Dragons of Mugloar](https://dragonsofmugloar.com) game. Built as part of a developer test assignment, the app provides a dynamic and responsive interface for interacting with the public game API.

## Key Features

- Fully functional game interface using the Dragons of Mugloar API
- Clean and modular component-based architecture with Vue 3 and `<script setup>` syntax
- Responsive layout and game status display
- Real-time updates for quests, stats, shopping, and reputation
- Game over screen and restart flow
- Shared UI styling for a consistent experience

## Gameplay Interface

- **Game Status Bar**

  - Fixed bar at the top showing lives, gold, score, turn, level, and high score
  - Displays last mission result (success or failure) with color highlight
  - Dropdown for reputation details and investigation button

- **Quest Panel**

  - Displays available quests sorted based on reward
  - Encrypted quests shown as locked with countdown to unlock
  - Buttons to solve quests with real-time state updates

- **Shop Panel**

  - Allows item purchases depending on available gold
  - Buttons disabled when unaffordable or loading

- **Game Over View**

  - Triggered automatically when lives reach 0
  - Shows summary of performance and option to restart

## Project Structure

```
src/
  components/
    StatusBar.vue       # Fixed status bar with live game stats
    QuestsPanel.vue     # Quest list and solve actions
    ShopPanel.vue       # Shop UI and purchase logic
    GameOverPanel.vue   # Endgame screen

  views/
    HomeView.vue        # Main game view layout and control logic

  assets/
    shared.css          # Shared button styles and layout classes

  stores/
    game.js             # Pinia store for game state and API logic
```

## Quick Start Guide

The following commands are intended for a Unix-style shell environment such as WSL2 (Windows Subsystem for Linux), native Linux, or MacOS.

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Clone the repository

```bash
git clone https://github.com/kjlellep/mugloar-ui.git
cd mugloar-ui
```

### Installation

```bash
npm install
```

### Run the App in Development Mode

```bash
npm run dev
```

Then open the browser to `http://localhost:5173` (or the port shown in terminal).

### Build for Production

```bash
npm run build
```

### Serve the built page locally

```bash
npm run preview
```

Then open the browser to `http://localhost:4173` (or the port shown in terminal).

## Notes

- No Vuex used: state is managed with Pinia for clarity and reactivity.
- API errors and loading states are gracefully handled in all views.
- Responsive design adapts to various screen sizes using flex and grid.
- UI interactivity (e.g., tooltips, dropdowns) is kept minimal and intuitive.

---

### Author

Built by Karl-Jonathan Lellep
