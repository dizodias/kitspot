# ⚽ KitSpot | Premium Football Kits E-Commerce

![Next.js](https://img.shields.io/badge/Next.js-16.0-000000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-1.13-5A29E4?style=flat-square&logo=axios)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

**KitSpot** is a modern, full-stack e-commerce platform dedicated to football (soccer) enthusiasts. Built with the latest **Next.js (App Router)** architecture, it provides a seamless shopping experience for team jerseys and kits, featuring dynamic routing, internal API endpoints, and global state management.

## 🚀 The Engineering Approach

This project demonstrates proficiency in building scalable and performant web applications using modern React ecosystems:

* **Full-Stack Next.js Architecture:** Leverages Next.js App Router for server-side rendering (SSR) and built-in Route Handlers (`/api/produtos`, `/api/times`, `/api/tabela`) to act as a robust internal backend.
* **Global State Management:** Implements React Context API (`CartContext` and `FilterContext`) to handle complex states like the shopping cart logic and team-based product filtering across the application without prop drilling.
* **Form Handling & Validation:** Uses `react-hook-form` integrated with `@hookform/resolvers` and `yup` for highly performant, accessible, and strictly typed form validations (e.g., Contact and Checkout flows).
* **Dynamic UI & Carousels:** Integrates `swiper` for touch-friendly, responsive product galleries and interactive UI components.

## 📊 Core Features

* **Dynamic Product Catalog:** Explore football kits filtered by teams, leagues, and categories.
* **Shopping Cart System:** Persistent cart functionality allowing users to add, remove, and review items before checkout.
* **Football Data Integration:** Features custom API endpoints delivering real-time-like data for league standings (`/tabela`) and team information.
* **Admin & Static Pages:** Includes an `/admin` dashboard layout, alongside company pages (`/sobre`, `/contato`, `/trabalhe-conosco`).

## 🛠 Tech Stack

* **Framework:** Next.js (v16.0.8) with App Router
* **Frontend:** React (v19.2), Bootstrap (v5.3) for responsive layouts
* **State Management:** React Context API
* **Data Fetching:** Axios
* **Forms & Validation:** React Hook Form + Yup
* **UI Utilities:** Swiper (Carousels), React Icons, UUID

## 🏁 Getting Started

Clone the repository and run it locally:

```bash
# 1. Clone the repo
git clone [https://github.com/dizodias/kitspot.git](https://github.com/dizodias/kitspot.git)
cd kitspot

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
