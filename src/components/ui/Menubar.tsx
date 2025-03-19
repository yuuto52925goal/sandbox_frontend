import './menubar.css';
import { Home, Gauge, Briefcase, Users, Power } from "lucide-react";


const Menubar = () => {
  return (
    <div className="bg-grey-main flex place-content-between flex-col  w-16 h-screen menu-bar">
      <div className="w-16 h-screen flex flex-col items-center py-4">
        <NavItem icon={<Home size={28} />} />
        <NavItem icon={<Gauge size={28} />} />
        <NavItem icon={<Briefcase size={28} />} />
        <NavItem icon={<Users size={28} />} className="mb-auto" />
      </div>
      <NavItem icon={<Power size={28} />} className="mt-auto mb-4" />
    </div>
  );
};

const NavItem = ({ icon, className }: { icon: React.ReactNode; className?: string }) => (
  <div className={`text-white p-3 hover:bg-gray-700 rounded-lg cursor-pointer ${className}`}>
    {icon}
  </div>
);

export default Menubar;