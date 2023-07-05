import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-spring-bottom-sheet/dist/style.css";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
