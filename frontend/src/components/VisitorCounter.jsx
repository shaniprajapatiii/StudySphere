import { useEffect, useState } from "react";

const VISITOR_COUNT_CACHE_KEY = "study_sphere_visitor_count_cache";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function VisitorCounter() {
   const [count, setCount] = useState(0);

   useEffect(() => {
      const cached = Number.parseInt(
         localStorage.getItem(VISITOR_COUNT_CACHE_KEY) || "0",
         10
      );
      if (!Number.isNaN(cached) && cached > 0) {
         setCount(cached);
      }

      const endpoints = [`${API_BASE_URL}/api/stats/visits`, "/api/stats/visits"];

      const updateCount = async () => {
         for (const endpoint of endpoints) {
            try {
               const res = await fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
               });
               if (!res.ok) {
                  continue;
               }

               const data = await res.json();
               if (typeof data.totalVisits === "number") {
                  setCount(data.totalVisits);
                  localStorage.setItem(VISITOR_COUNT_CACHE_KEY, String(data.totalVisits));
                  return;
               }
            } catch {
               // Try next endpoint.
            }
         }
      };

      updateCount();
   }, []);

   return (
      <div
         className="fixed bottom-4 left-4 z-50 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md"
         style={{
            backgroundColor: "var(--bg-overlay)",
            borderColor: "var(--border-strong)",
         }}
         aria-live="polite"
         aria-label="Visitor count"
      >
         {/* <p className="text-xs font-semibold uppercase tracking-wide theme-text-muted">Visitors</p> */}
         <p className="text-lg font-extrabold leading-none theme-text-primary">{count}</p>
      </div>
   );
}
