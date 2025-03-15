import { useState, useEffect } from "react";
import { User, Plus, X } from "lucide-react";
import Loader from "../components/Loader.jsx";
import Create from "../components/Create";
import axios from "axios";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [username, setUsername] = useState("");
  const loadWorkspaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/workspace",
        {
          withCredentials: true,
        }
      );
      setWorkspaces(response.data.data.workspaces);
      console.log("Workspaces: ", response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  const loadUsername = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/profile",
        {
          withCredentials: true,
        }
      );
      setUsername(response.data.data.user.username);
      console.log("Username: ", response.data.data.user.username);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    loadWorkspaces();
    loadUsername();
  }, []);
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
          <div className="font-semibold text-xl mt-2">
            Hi {username}, What do you want to make?
          </div>
          <div
            className="py-2 border border-gray-400 w-56 rounded-sm flex justify-center items-center mt-2 hover:bg-[#3D485F] cursor-pointer"
            onClick={openOverlay}
          >
            <Plus strokeWidth={1} />
            <span className="ml-2">Create Workspace</span>
          </div>
        </div>

        <div className="w-2/3">
          {loading && Loader}
          <div className="text-xl font-semibold mt-2">
            Your recent workspaces
            <div className="grid grid-cols-3 gap-4 mt-2">
              {workspaces.map((workspace) => (
                <div key={workspace._id} className="bg-gray-700 p-4 rounded-md">
                  <div className="font-semibold">{workspace.name}</div>
                  <div className="text-sm">{workspace.language}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOverlayVisible && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={closeOverlay}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Create
              workspaces={workspaces}
              setWorkspaces={setWorkspaces}
              setIsOverlayVisible={setIsOverlayVisible}
            />
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
