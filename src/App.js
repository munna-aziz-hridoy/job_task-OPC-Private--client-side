import Table from "./Components/Table";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="w-4/5 max-w-7xl p-10 rounded-xl shadow-2xl bg-white">
        <Table />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
