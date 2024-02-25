import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/star64.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/star256white.png" sizes="256x256" />
        <link rel="apple-touch-icon" href="/star512white.png" sizes="512x512" />
        <meta name="apple-mobile-web-app-title" content="Google Reviews"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
