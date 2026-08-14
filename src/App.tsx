import { createHashRouter, RouterProvider } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { StudioPage } from "./pages/StudioPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { JournalPage } from "./pages/JournalPage";
import { TeamPage } from "./pages/TeamPage";
import { ContactPage } from "./pages/ContactPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createHashRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/studio", element: <StudioPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/architecture", element: <ProjectsPage filter="Architecture" /> },
      { path: "/projects/interior", element: <ProjectsPage filter="Interior" /> },
      { path: "/projects/:slug", element: <ProjectDetailPage /> },
      { path: "/journal", element: <JournalPage /> },
      { path: "/team", element: <TeamPage /> },
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
