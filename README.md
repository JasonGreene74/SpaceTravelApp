# SpaceTravelApp 

SpaceTravelApp is a React-based application that allows users to explore planets, view spacecrafts, and manage interplanetary missions. The app integrates with the SWAPI API for Star Wars-themed data and includes custom features like creating your own spacecraft and managing decommissioned crafts.

---

## Features

### **Planets**
- View a list of planets from the Star Wars universe.
- Click on a planet to see detailed information, including climate, terrain, population, and more.
- Randomly assigned spacecrafts are displayed for each planet.

###  **Spacecrafts**
- View a list of available spacecrafts.
- Decommission spacecrafts, which disables them for missions and marks them in red.
- Create your own custom spacecraft and see it added to the list.

### **Create Your Own Craft**
- Design a custom spacecraft by specifying:
  - Name
  - Cargo capacity
  - Passenger capacity
  - Propulsion type
  - Atmospheric entry/departure method
  - Orbit/landing type
- Newly created crafts appear at the top of the Spacecrafts page and are available for missions.

### **Mission Control**
- Plan interplanetary missions by selecting:
  - Departure planet
  - Destination planet
  - Spacecraft
  - Number of passengers
  - Main contact
- Decommissioned spacecrafts are disabled in the dropdown and marked as "Decommissioned."

---

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Vite**: Development environment for fast builds and hot module replacement.
- **SWAPI API**: Provides Star Wars-themed data for planets and spacecrafts.
- **CSS**: Custom styling for a space-themed design.

---

## How to Run the App

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SpaceTravelApp.git
   cd SpaceTravelApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## Images and Data Sources

- **Images**: NASA.gov, ScienceAlert.com
- **Data**: SWAPI.info API

---

## Future Enhancements

- Persist decommissioned and custom spacecrafts using `localStorage` or a backend.
- Add more detailed mission tracking and history.
- Expand the list of planets and spacecrafts.

---

## License

This project is for educational purposes and is not affiliated with NASA or Star Wars.

---

## File Structure

```
SpaceTravelApp/
├── public/                 # Static assets (e.g., index.html)
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── CreateYourOwn.jsx
│   │   ├── HomePage.jsx
│   │   ├── MissionControl.jsx
│   │   ├── PlanetsPage.jsx
│   │   ├── SpacecraftDetailPage.jsx
│   │   ├── SpacecraftsPage.jsx
│   │   └── Loading.jsx
│   ├── tests/              # Unit tests
│   │   ├── App.test.jsx
│   │   ├── MissionControl.test.jsx
│   │   ├── PlanetsPage.test.jsx
│   │   └── SpacecraftsPage.test.jsx
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── README.md               # Project documentation
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```



