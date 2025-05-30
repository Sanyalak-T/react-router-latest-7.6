// existing imports
import { getContacts } from "./data";
import {
  Form,
  Outlet,
  Link,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  redirect,
} from "react-router";
import type { Route } from "./+types/root";

import appStylesHref from "./app.css?url";

import { createEmptyContact } from "./data";

export async function action() {
  const contact = await createEmptyContact();
  return { contact };
}

export function HydrateFallback() {
  return (
    <div id="loading-splash">
      <div id="loading-splash-spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}

// export default function App({
//   loaderData,
// }: Route.ComponentProps) {
//   const { contacts } = loaderData;
//   return (
//     <>
//       <div id="sidebar">
//         <h1>
//           <Link to="about">React Router Contacts</Link>
//         </h1>
//         <div>
//           <Form id="search-form" role="search">
//             <input
//               aria-label="Search contacts"
//               id="q"
//               name="q"
//               placeholder="Search"
//               type="search"
//             />
//             <div aria-hidden hidden={true} id="search-spinner" />
//           </Form>
//           <Form method="post">
//             <button type="submit">New</button>
//           </Form>
//         </div>
//         <nav>
//           {contacts.length ? (
//             <ul>
//               {contacts.map((contact) => (
//                 <li key={contact.id}>
//                   <Link to={`contacts/${contact.id}`}>
//                     {contact.first || contact.last ? (
//                       <>
//                         {contact.first} {contact.last}
//                       </>
//                     ) : (
//                       <i>No Name</i>
//                     )}
//                     {contact.favorite ? (
//                       <span>★</span>
//                     ) : null}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>
//               <i>No contacts</i>
//             </p>
//           )}
//         </nav>
//       </div>
//       <div id="detail">
//         <Outlet />
//       </div>
//     </>
//   );
// }

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={appStylesHref} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id="error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
