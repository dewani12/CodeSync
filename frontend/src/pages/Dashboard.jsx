import { useState } from "react";
import { useLocation } from "react-router-dom";
import { User, Plus, X } from "lucide-react";
import Create from "../components/Create"; 

function Dashboard() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const username = query.get("name");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const openOverlay = () => {
    setIsOverlayVisible(true);
  };
  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div className="bg-gray-800 text-gray-200 relative">
      <nav className="border-b border-gray-600 px-5 py-2 h-12 flex justify-between items-center">
        <div className="text-xl font-semibold">CodeSync</div>
        <div className="flex items-center">
          <User strokeWidth={1.5} />
          <span className="text-xl">{username}</span>
        </div>
      </nav>

      <div className="flex px-5 gap-4 h-screen">
        <div className="w-1/3 border-r border-gray-600">
          <div className="font-semibold text-xl mt-2">Hi {username}, What do you want to make?</div>
          <div 
            className="py-2 border border-gray-400 w-56 rounded-sm flex justify-center items-center mt-2 hover:bg-[#3D485F] cursor-pointer"
            onClick={openOverlay}
          >
            <Plus strokeWidth={1} />
            <span className="ml-2">Create Workspace</span>
          </div>
        </div>

        <div className="w-2/3">
          <div className="text-xl font-semibold mt-2">Your recent workspaces</div>
        </div>
      </div>

      {/* Overlay */}
      {isOverlayVisible && (
        <div 
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={closeOverlay}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <Create />
            <button
              className="absolute top-2 right-2 text-white cursor-pointer"
              onClick={closeOverlay}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
