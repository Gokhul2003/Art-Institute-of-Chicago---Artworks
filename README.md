<h1 align="center">🎨 ART-TABLE — PrimeReact DataTable App</h1>

A **modern React + TypeScript web application** that displays artwork data using **PrimeReact DataTable** with advanced features like **lazy server-side pagination**, **multi-page selection**, and a **custom row selection overlay** — all wrapped in a clean, responsive UI.

Built using **Vite + React + TypeScript** for high performance and scalability.

---

## 🎥 Demo Preview

<h3 align="center">Artwork DataTable with Lazy Pagination & Multi-Page Selection 👇</h3>

<!-- Add your demo video link here -->

---

## 🚀 Features

- 📄 Lazy (Server-Side) Pagination  
- 🔢 Dynamic entry counter  
  - `Showing X to Y of Z entries`
- ✅ Multi-row selection across multiple pages  
- 🎯 Custom "Select N Rows" feature using OverlayPanel  
- ⚡ Optimized performance for large datasets  
- 🎨 Clean and responsive UI with PrimeReact  
- 🔷 Fully typed with TypeScript  

---

## 💻 Technologies Used

### **Frontend**
- ⚛️ **React (Vite)** — Fast modern frontend setup  
- 🔷 **TypeScript** — Type-safe development  
- 🎛️ **PrimeReact** — Rich UI component library  
- 🎨 **PrimeIcons** — Icon support  
- 🌐 **Axios** — API data fetching  

---

## 📂 Project Layout

| Folder / File | Description |
|---------------|-------------|
| **src/components/** | Contains `ArtworkTable.tsx` |
| **src/api.ts** | Axios-based API handler |
| **src/types.ts** | TypeScript interfaces |
| **src/App.tsx** | Root component |
| **src/main.tsx** | Application entry point |
| **vite.config.ts** | Vite configuration |
| **tsconfig.json** | TypeScript configuration |

---

## 🧱 Project Architecture

```
ART-TABLE/
│
├── public/
├── src/
│   ├── components/
│   │   └── ArtworkTable.tsx
│   ├── api.ts
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🧾 Setup & Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/art-table.git
cd art-table
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Required Packages

If not installed:

```bash
npm install axios primereact primeicons
```

---

### 4️⃣ Run the Application

```bash
npm run dev
```

Open 👉 http://localhost:5173

---

## ✨ Core Functionalities Explained

### 📌 Lazy Pagination

- Fetches only required page data from API  
- Reduces memory usage  
- Handles large datasets efficiently  
- Uses controlled pagination with `first` state  

---

### 📌 Multi-Page Row Selection

- Selection persists across different pages  
- Uses efficient `Set<number>` logic  
- Fully controlled PrimeReact `DataTable` selection  

---

### 📌 Custom Select Feature

- OverlayPanel allows user to input number  
- Automatically selects first **N rows** on current page  
- Improves user control and usability  

---

### 📌 Entry Counter (Left of Pagination)

```tsx
paginatorLeft={
  <div>
    Showing {startEntry} to {endEntry} of {totalRecords} entries
  </div>
}
```

---

## 🔌 API Handling

`api.ts`

```ts
import axios from "axios";

export const fetchArtworks = async (page: number, limit: number) => {
  return axios.get(`API_URL?page=${page}&limit=${limit}`);
};
```

---

## 🔮 Future Improvements

- 🔍 Global Search  
- 📊 Column Filtering  
- 📥 CSV Export  
- 🌙 Dark Mode  
- 📱 Enhanced Mobile Responsiveness  
- 🔐 Authentication Layer  

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes  

```bash
git commit -m "Added new feature"
```

4. Push to your branch  

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request 🚀  

---

## 💡 Author

👤 **Gokhul Kooranchi**  
📧 thegokhul.kooranchi@gmail.com  
🎓 MCA (Batch 2026)  
💻 Full Stack Developer | React + TypeScript Enthusiast  

> ⚙️ Built with ❤️ using React, TypeScript, PrimeReact & Vite.
