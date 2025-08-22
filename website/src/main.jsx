import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.jsx";

import store from "./store/redux";

import "react-toastify/dist/ReactToastify.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";

const root = createRoot(document.getElementById("app"));

root.render(
	<Provider store={store}>
		<PrimeReactProvider>
			<BrowserRouter>
				<ToastContainer />
				<App />
			</BrowserRouter>
		</PrimeReactProvider>
	</Provider>
);
