import * as OfflinePluginRuntime from "offline-plugin/runtime";

import "../styles/index.scss";

if (("process.env.NODE_ENV:", process.env.NODE_ENV === "production")) {
	console.log("Installing Offline-plugin");
	OfflinePluginRuntime.install();
}

