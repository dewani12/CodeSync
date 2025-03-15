import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

function Create({ workspaces, setWorkspaces, setIsOverlayVisible }) {
  const languages = ["C++", "Python", "Java", "C", "JavaScript"];
  const [title, setTitle] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [language, setLanguage] = useState(languages[0]);
  const dt1 = [
    "Algorithm",
    "Backend",
    "Binary",
    "Cache",
    "Cloud",
    "Compile",
    "Data",
    "Debug",
    "Devops",
    "Encryption",
    "Frontend",
    "Function",
    "Gateway",
    "Hashing",
    "Index",
    "Iterate",
    "Lambda",
    "Latency",
    "Loop",
    "Middleware",
    "Node",
    "Object",
    "Optimize",
    "Parallel",
    "Query",
    "Recursion",
    "Scalability",
    "Server",
    "Syntax",
    "Variable",
  ];
  const dt2 = [
    "Api",
    "Asynchronous",
    "Authentication",
    "Bandwidth",
    "Bytecode",
    "Cdn",
    "Cipher",
    "Class",
    "Container",
    "Database",
    "Dependency",
    "Docker",
    "Endpoint",
    "Framework",
    "Garbage",
    "Hosting",
    "Http",
    "Inheritance",
    "Instance",
    "Interface",
    "Json",
    "Kernel",
    "Loadbalancer",
    "Microservice",
    "Namespace",
    "Orm",
    "Package",
    "Polymorphism",
    "Protocol",
    "Rest",
  ];

  const dt3 = [
    "Scalability",
    "Scheduler",
    "Session",
    "Singleton",
    "State",
    "Subnet",
    "Thread",
    "Token",
    "Transaction",
    "Ui",
    "Ux",
    "Virtualization",
    "Webhook",
    "Webrtc",
    "Websocket",
    "Workflow",
    "Xss",
    "Zero-day",
    "Abstraction",
    "Callback",
    "Cli",
    "Closure",
    "Concurrency",
    "Daemon",
    "Debugger",
    "Dns",
    "Ec2",
    "Event",
    "Fault-tolerance",
    "Git",
  ];

  function generateRandomWord() {
    const word1 = dt1[Math.floor(Math.random() * dt1.length)];
    const word2 = dt2[Math.floor(Math.random() * dt2.length)];
    const word3 = dt3[Math.floor(Math.random() * dt3.length)];
    return `${word1}${word2}${word3}`;
  }
  useEffect(() => {
    const workspaceName = generateRandomWord();
    setTitle(workspaceName);
  }, []);
  const handleCreateWorkspace = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/workspace/createWorkspace",
        {
          name: title,
          visibility: privacy,
          language,
        },
        {
          withCredentials: true,
        }
      );
      setWorkspaces([...workspaces, { name: title, language, visibility: privacy }]);
      setIsOverlayVisible(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="bg-[#2B3245] p-4 text-white w-fit rounded-sm border border-gray-600">
      <div className="text-2xl font-semibold">Create a new Workspace</div>
      <div className="mt-3 flex gap-6 text-sm text-gray-100">
        <div>
          <div>Choose a Template</div>
          <select
            className="bg-[#3D485F] py-1 px-2 rounded-sm w-60 mt-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>Title</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#3D485F] py-1 px-2 rounded-sm w-60 mt-2"
          />
          <div className="mt-2">
            <div>Privacy</div>
            <div className="flex gap-4 mt-1">
              <label>
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={privacy === "public"}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="mr-1"
                />
                Public
              </label>
              <label>
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={privacy === "private"}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="mr-1"
                />
                Private
              </label>
            </div>
            <div className="py-1 border border-gray-400 rounded-sm flex justify-center items-center mt-3 hover:bg-[#3D485F] cursor-pointer">
              <Plus strokeWidth={1} />
              <span className="ml-2" onClick={handleCreateWorkspace}>
                Create Workspace
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
