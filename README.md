# Quasar Tech Test App - Aditya (quasar-techtest-aditya)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## 🏗️ Architecture Overview

### 1. **Technology Stack**

| Layer              | Technology                                                                      | Reason                                                                                       |
| ------------------ | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Frontend Framework | [Vue 3](https://vuejs.org/)                                                     | Reactive, component-based UI with Composition API support                                    |
| UI Framework       | [Quasar Framework](https://quasar.dev/)                                         | Rich set of responsive, Material Design–inspired components optimized for mobile and desktop |
| State Management   | [Pinia](https://pinia.vuejs.org/)                                               | Official Vue store library, lightweight and type-safe                                        |
| Routing            | [Vue Router 4](https://router.vuejs.org/)                                       | Handles page navigation, role-based guards, and lazy-loaded routes                           |
| Mock API / Data    | Local JSON files served via `public/data`                                       | Simplifies development and testing without a backend                                         |
| Testing            | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) | Unit testing for Vue components and Pinia stores                                             |
| Charting           | [Chart.js](https://www.chartjs.org/) (via vue-chartjs)                          | Interactive data visualizations in admin dashboards                                          |

---

### 2. **Folder Structure**

```
src/
├── assets/ # Static assets (images, icons)
├── components/ # Reusable UI components (e.g., Sidebar, Navbar, Widgets)
├── layouts/ # Layout wrappers (MainLayout)
├── pages/ # Page-level views (Dashboard, Outlets, OutletDetail, etc.)
├── router/ # Vue Router configuration + route guards
├── stores/ # Pinia stores (auth, outlets, orders)
├── types/ # TypeScript interfaces (User, Outlet, Order)
├── utils/ # Helper functions (mock API, data grouping)
├── css/ # Global and Quasar SCSS variables
└── main.ts # App entry point
```

This modular structure ensures **clear separation of concerns**:

- **Components** handle UI composition.
- **Pages** handle route-level logic and data fetching.
- **Stores** provide centralized state and persistence.
- **Router** manages navigation and access control.
- **Mock data** simulates backend APIs for testing and development.

---

### 3. **Role-Based Routing**

The app supports two main roles:

- **Admin**: Full access to dashboards, outlets, and reports.
- **Sales**: Access only to assigned outlets and restricted pages.

Role guards are implemented in the **router** and **store**, ensuring that:

- Sales users can’t access admin routes or other users’ outlets.
- Unauthorized access redirects to a `Forbidden` page.

---

### 4. **Authentication & Persistence**

User login is validated against `users.json` (mock data).  
The authenticated session is stored in **`localStorage`**, allowing persistence across reloads but automatically cleared when the session ends.

---

### 5. **Data Layer**

Mock data (e.g., `users.json`, `outlets.json`, `orders.json`) is located under:

```ts
public/data/
```

Data fetching uses `fetch()` with relative URLs to simulate REST APIs.  
Each mock module (e.g., outlets, orders) provides functions like:

```ts
export async function fetchOutlets(): Promise<Outlet[]> { ... }
```

---

### 6. **Charts and Dashboard**

The admin dashboard uses a Chart.js bar chart widget to visualize outlet totals by location.
Data is dynamically aggregated using helper utilities that group outlets by their region.

Example:

```ts
{ "Yogyakarta": 4, "Surabaya": 3, "Jakarta": 2 }
```

DEMO: https://resilient-praline-00baac.netlify.app/

SCREENSHOT:

- **Dashboard Screenshot**
  Admin
  ![Admin Dashboard Screenshot](src/assets/screenshot/admin%20-%20home.png)
  User
  ![User Dashboard Screenshot](src/assets/screenshot/user%20home.png)

- **Outlets Screenshot**
  Admin
  ![Admin Outlets Screenshot](src/assets/screenshot/admin%20-%20outlets.png)
  User
  ![User Outlets Screenshot](src/assets/screenshot/user%20-%20outlets.png)

- **Outlets Detail Screenshot**
  Admin
  ![Admin Outlets Detail Screenshot](src/assets/screenshot/admin%20-%20outlet%20detail.png)
  User
  ![User Outlets Detail Screenshot](src/assets/screenshot/user%20-%20outlet%20detail.png)
