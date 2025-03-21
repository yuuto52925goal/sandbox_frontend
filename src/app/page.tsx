
import Menubar from "../components/ui/Menubar"
import { Dashboard } from "@/components/Dashboard";
import "./page.module.css"
import "./page.css"

export default function MainPage() {

  return (
    <div className="flex h-screen flex-grow h-full">
      <Menubar/>
      <Dashboard />
    </div>
  );
}
