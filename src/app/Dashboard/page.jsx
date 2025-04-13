// app/Dashboard/page.jsx
import { redirect } from "next/navigation";

export default function DashboardHome() {
  redirect("/Dashboard/welcome");
}
