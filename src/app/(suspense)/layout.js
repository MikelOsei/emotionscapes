import { Suspense } from "react";
export default function SuspenseLayout({ children }) {
  return <Suspense>{children}</Suspense>;
}
