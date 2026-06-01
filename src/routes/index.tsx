import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ProjectsPage from "../pages/ProjectsPage";
import Contact from "../pages/Contact";

const basename = import.meta.env.VITE_BASE?.replace(/\/$/, "") || undefined;

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "services", element: <ServicesPage /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ],
  basename ? { basename } : undefined,
);
