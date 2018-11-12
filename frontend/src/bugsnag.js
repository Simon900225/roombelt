import React from "react";
import bugsnag from "bugsnag-js";
import createPlugin from "bugsnag-react";

export const client = bugsnag({ apiKey: "2f79790be5adc801ab59781b5a7c4b88" });
export const ErrorBoundary = client.use(createPlugin(React));
