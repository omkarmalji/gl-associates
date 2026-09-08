import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProcessPage } from "./pages/ProcessPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { StudioPage } from "./pages/StudioPage";

const router = createHashRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/architecture", element: <ProjectsPage filter="Architecture" /> },
      { path: "/projects/interior", element: <ProjectsPage filter="Interior" /> },
      { path: "/projects/:slug", element: <ProjectDetailPage /> },
      { path: "/studio", element: <StudioPage /> },
      { path: "/process", element: <ProcessPage /> },
      { path: "/journal", element: <Navigate to="/process" replace /> },
      { path: "/team", element: <Navigate to="/studio?scene=1" replace /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/privacy", element: <LegalPage type="Privacy" /> },
      { path: "/terms", element: <LegalPage type="Terms" /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
