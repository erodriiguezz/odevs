"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import {
  adminSession,
  adminLogout,
  fetchEventsByStatus,
  approveEvent,
  rejectEvent,
  patchEvent,
  type AdminEvent,
} from "@/lib/admin/api";

type Draft = Partial<Pick<AdminEvent, "title" | "description" | "date" | "time" | "location">>;

export default function AdminQueuePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const ok = await adminSession();
      if (!ok) {
        router.replace("/admin/login");
        return;
      }
      setEvents(await fetchEventsByStatus("pending"));
      setChecking(false);
    })();
  }, [router]);

  function updateDraft(id: string, field: keyof Draft, value: string) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  }

  async function handleApprove(id: string) {
    setBusyId(id);
    const draft = drafts[id];
    if (draft && Object.keys(draft).length > 0) {
      await patchEvent(id, draft);
    }
    await approveEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setBusyId(null);
  }

  async function handleReject(id: string) {
    setBusyId(id);
    await rejectEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setBusyId(null);
  }

  async function handleSave(id: string) {
    const draft = drafts[id];
    if (!draft || Object.keys(draft).length === 0) return;
    setBusyId(id);
    const updated = await patchEvent(id, draft);
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
    setDrafts((prev) => ({ ...prev, [id]: {} }));
    setBusyId(null);
  }

  async function handleLogout() {
    await adminLogout();
    router.replace("/admin/login");
  }

  return (
    <section className="bg-background text-foreground py-16 lg:py-28 min-h-screen relative">
      <div
        className="absolute inset-0 pointer-events-none dark:block hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(91,79,233,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          label="Admin"
          title="Pending events"
          description={
            checking
              ? "Checking session…"
              : `${events.length} event${events.length === 1 ? "" : "s"} waiting for review.`
          }
        />

        {!checking && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            </div>

            {events.length === 0 ? (
              <p className="text-muted-foreground">Nothing pending. New scraped events will show up here.</p>
            ) : (
              <div className="flex flex-col gap-6" role="list">
                {events.map((event) => {
                  const draft = drafts[event.id] ?? {};
                  const busy = busyId === event.id;

                  return (
                    <div
                      key={event.id}
                      role="listitem"
                      className="border border-border rounded-xl p-5 bg-surface flex flex-col gap-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          defaultValue={event.title}
                          onChange={(e) => updateDraft(event.id, "title", e.target.value)}
                          placeholder="Title"
                          className="bg-background border border-border rounded-lg px-3 py-2 text-foreground font-semibold"
                        />
                        <input
                          defaultValue={event.location}
                          onChange={(e) => updateDraft(event.id, "location", e.target.value)}
                          placeholder="Location"
                          className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                        />
                        <input
                          defaultValue={event.date}
                          onChange={(e) => updateDraft(event.id, "date", e.target.value)}
                          placeholder="YYYY-MM-DD"
                          className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                        />
                        <input
                          defaultValue={event.time}
                          onChange={(e) => updateDraft(event.id, "time", e.target.value)}
                          placeholder="Time range"
                          className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                        />
                      </div>
                      <textarea
                        defaultValue={event.description}
                        onChange={(e) => updateDraft(event.id, "description", e.target.value)}
                        placeholder="Description"
                        className="bg-background border border-border rounded-lg px-3 py-2 text-foreground min-h-24"
                      />
                      <div className="flex gap-3 flex-wrap items-center">
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View source ↗
                        </a>
                        <div className="flex-1" />
                        <button
                          disabled={busy || Object.keys(draft).length === 0}
                          onClick={() => handleSave(event.id)}
                          className="text-sm border border-border rounded-full px-4 py-2 hover:border-foreground disabled:opacity-40"
                        >
                          Save edits
                        </button>
                        <button
                          disabled={busy}
                          onClick={() => handleReject(event.id)}
                          className="text-sm border border-red-400 text-red-500 rounded-full px-4 py-2 hover:bg-red-500/10 disabled:opacity-40"
                        >
                          Reject
                        </button>
                        <button
                          disabled={busy}
                          onClick={() => handleApprove(event.id)}
                          className="text-sm bg-primary hover:bg-primary-glow text-white rounded-full px-4 py-2 font-semibold disabled:opacity-40"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
