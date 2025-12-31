"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Charity = {
  charity_id: number;
  name: string;
  verified: boolean;
};

type InventoryItem = {
  clothing_id: number;
  type: string;
  size: string;
  condition: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  drafted_status: "AVAILABLE" | "ALLOCATED";
  front_image_url: string;
  back_image_url: string;
  donation_request_id: number;
  donation_id: number | null;
};

type Analytics = {
  typeSplit: { type: string; count: number }[];
  itemsByCharity: { charity_id: number; name: string; count: number }[];
};

type SelectedCharityId = number | "" | "ALL";

const CHART_COLORS = [
  "#2E7D32",
  "#66BB6A",
  "#A5D6A7",
  "#1B5E20",
  "#4CAF50",
  "#81C784",
  "#C8E6C9",
  "#388E3C",
  "#43A047",
  "#00C853",
  "#009688",
  "#26A69A",
  "#8BC34A",
  "#7CB342",
  "#00ACC1",
  "#039BE5",
];

function safeImgUrl(u?: string) {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return u;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
      {children}
    </span>
  );
}

function Thumbnail({
  src,
  alt,
  onClick,
  size = "md",
}: {
  src?: string;
  alt: string;
  onClick: () => void;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "w-12 h-12" : "w-12 h-12";

  if (!src) {
    return (
      <div
        className={`${dims} rounded-md border bg-gray-50 text-gray-400 flex items-center justify-center text-[10px]`}
      >
        —
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${dims} rounded-md overflow-hidden border bg-gray-50 hover:ring-2 hover:ring-green-200 transition`}
      title="Tap to view"
    >
      <img
        src={safeImgUrl(src)}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </button>
  );
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function InventoryTab() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedCharityId, setSelectedCharityId] =
    useState<SelectedCharityId>("");

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const [charitiesError, setCharitiesError] = useState<string | null>(null);

  // image modal
  const [imageOpen, setImageOpen] = useState(false);
  const [imageItem, setImageItem] = useState<InventoryItem | null>(null);

  // mobile collapsible state
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // search + pagination
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState<10 | 20 | 50>(20);
  const [page, setPage] = useState(1);

  const selectedCharity = useMemo(() => {
    if (typeof selectedCharityId !== "number") return null;
    return charities.find((c) => c.charity_id === selectedCharityId) ?? null;
  }, [charities, selectedCharityId]);

  async function loadCharities() {
    setCharitiesError(null);

    const res = await fetch(`/api/admin/charities`, {
      credentials: "include",
      cache: "no-store",
    });

    let body: any = null;
    try {
      body = await res.json();
    } catch {}

    if (!res.ok) {
      console.error("GET /api/admin/charities failed:", res.status, body);
      setCharities([]);
      setCharitiesError(
        body?.error ?? `Failed to load charities (HTTP ${res.status})`
      );
      return;
    }

    setCharities(Array.isArray(body) ? body : []);
  }

  async function loadAnalytics() {
    setAnalyticsError(null);
    setLoadingAnalytics(true);

    try {
      const res = await fetch(`/api/admin/inventory/analytics`, {
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(
          "GET /api/admin/inventory/analytics failed:",
          res.status,
          json
        );
        setAnalytics(null);
        setAnalyticsError(
          json?.error ?? `Failed to load analytics (HTTP ${res.status})`
        );
        return;
      }

      setAnalytics(json);
    } catch (err) {
      console.error("Error loading analytics:", err);
      setAnalytics(null);
      setAnalyticsError("Error loading analytics");
    } finally {
      setLoadingAnalytics(false);
    }
  }

  async function loadInventory(selection: SelectedCharityId) {
    setItemsError(null);
    setLoadingItems(true);

    try {
      let url = "/api/admin/inventory";

      // If a specific charity is selected, add charityId param
      if (typeof selection === "number") {
        const qs = new URLSearchParams({ charityId: String(selection) });
        url = `/api/admin/inventory?${qs.toString()}`;
      }
      // If selection === "ALL", we intentionally pass no charityId
      // so the backend returns all items.

      const res = await fetch(url, {
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("GET /api/admin/inventory failed:", res.status, json);
        setItems([]);
        setItemsError(
          json?.error ?? `Failed to load inventory (HTTP ${res.status})`
        );
        return;
      }

      setItems(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error("Error loading inventory:", err);
      setItems([]);
      setItemsError("Error loading inventory");
    } finally {
      setLoadingItems(false);
    }
  }

  useEffect(() => {
    loadCharities();
    loadAnalytics();
  }, []);

  useEffect(() => {
    if (selectedCharityId === "") return;

    setExpandedId(null);
    setQuery("");
    setPage(1);

    loadInventory(selectedCharityId);
  }, [selectedCharityId]);

  function openImages(item: InventoryItem) {
    setImageItem(item);
    setImageOpen(true);
  }

  function closeImages() {
    setImageOpen(false);
    setImageItem(null);
  }

  // FILTER (search) + PAGINATION
  const filteredItems = useMemo(() => {
    const q = normalize(query);
    if (!q) return items;

    return items.filter((it) => {
      const hay = normalize(
        [
          it.clothing_id,
          it.type,
          it.size,
          it.condition,
          it.status,
          it.donation_request_id,
          it.donation_id ?? "",
        ].join(" ")
      );
      return hay.includes(q);
    });
  }, [items, query]);

  const totalPages = useMemo(() => {
    const n = Math.ceil(filteredItems.length / pageSize);
    return n <= 0 ? 1 : n;
  }, [filteredItems.length, pageSize]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  // CHARTS
  const typeChartData = useMemo(() => {
    const labels = analytics?.typeSplit?.map((x) => x.type) ?? [];
    const values = analytics?.typeSplit?.map((x) => x.count) ?? [];
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: labels.map(
            (_, i) => CHART_COLORS[i % CHART_COLORS.length]
          ),
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  }, [analytics]);

  const charityChartData = useMemo(() => {
    const list = analytics?.itemsByCharity ?? [];
    const top = list.slice(0, 8);
    const rest = list.slice(8);
    const otherCount = rest.reduce((acc, x) => acc + x.count, 0);

    const labels = [
      ...top.map((x) => x.name),
      ...(otherCount > 0 ? ["Other"] : []),
    ];
    const values = [
      ...top.map((x) => x.count),
      ...(otherCount > 0 ? [otherCount] : []),
    ];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: labels.map(
            (_, i) => CHART_COLORS[i % CHART_COLORS.length]
          ),
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  }, [analytics]);

  const doughnutOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false as const,
      plugins: {
        legend: { position: "bottom" as const },
        tooltip: { enabled: true },
      },
      cutout: "65%",
    }),
    []
  );

  const hasSelection = selectedCharityId !== "";

  const selectionLabel =
    selectedCharityId === "ALL"
      ? "All charities"
      : selectedCharity
        ? selectedCharity.name
        : null;

  return (
    <div className="h-full min-h-0 flex flex-col gap-4">
      {/* Inventory (including controls) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-0">
        {/* Slimmer header with controls */}
        <div className="px-4 py-3 border-b bg-gray-50 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Charity Inventory
            </h3>
            <div className="text-xs md:text-sm text-gray-600">
              {selectionLabel ? (
                <span>
                  Viewing: <b>{selectionLabel}</b>
                </span>
              ) : (
                <span>Select a charity or “All items”</span>
              )}
            </div>
          </div>

          {charitiesError && (
            <p className="text-xs text-red-600">{charitiesError}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Charity
              </label>
              <select
                className="w-full border rounded-lg px-2 py-2 text-sm"
                value={
                  selectedCharityId === ""
                    ? ""
                    : selectedCharityId === "ALL"
                      ? "ALL"
                      : String(selectedCharityId)
                }
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") {
                    setSelectedCharityId("");
                    setItems([]);
                  } else if (v === "ALL") {
                    setSelectedCharityId("ALL");
                  } else {
                    setSelectedCharityId(Number(v));
                  }
                }}
              >
                <option value="">— Choose charity —</option>
                <option value="ALL">All items</option>
                {charities.map((c) => (
                  <option key={c.charity_id} value={c.charity_id}>
                    {c.name}
                    {c.verified ? "" : " (unverified)"}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Search
              </label>
              <input
                className="w-full border rounded-lg px-2 py-2 text-sm"
                placeholder="Type, id, size, condition…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={!hasSelection}
              />
            </div>

            <div className="md:col-span-1 flex flex-col md:flex-row md:items-end gap-1">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Page size
                </label>
                <select
                  className="w-full border rounded-lg px-2 py-2 text-sm"
                  value={String(pageSize)}
                  onChange={(e) => setPageSize(Number(e.target.value) as any)}
                  disabled={!hasSelection}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="hidden md:block text-xs text-gray-500 md:text-right">
                <div>
                  Showing <b>{pagedItems.length}</b> of{" "}
                  <b>{filteredItems.length}</b>
                </div>
                <div>
                  Page <b>{page}</b> / <b>{totalPages}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body: items */}
        <div className="flex-1 min-h-0 overflow-auto">
          {selectedCharityId === "" ? (
            <div className="p-4 text-gray-500 text-sm">
              Choose a charity or “All items” above to view inventory.
            </div>
          ) : loadingItems ? (
            <div className="p-4 text-gray-500 text-sm">Loading inventory…</div>
          ) : itemsError ? (
            <div className="p-4 text-red-600 text-sm">{itemsError}</div>
          ) : filteredItems.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">
              No items match your search.
            </div>
          ) : (
            <>
              {/* Mobile cards (collapsible) */}
              <div className="md:hidden p-3 space-y-3">
                {pagedItems.map((it) => {
                  const expanded = expandedId === it.clothing_id;

                  return (
                    <div
                      key={it.clothing_id}
                      className="border rounded-xl bg-white shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(expanded ? null : it.clothing_id)
                        }
                        className="w-full text-left p-3 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            Item #{it.clothing_id} • {it.type}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Request #{it.donation_request_id}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{it.status}</Badge>
                          <span className="text-gray-400 text-xl leading-none">
                            {expanded ? "−" : "+"}
                          </span>
                        </div>
                      </button>

                      <div className="px-3 pb-3">
                        <div className="flex items-center gap-3">
                          <Thumbnail
                            src={it.front_image_url}
                            alt="Front thumbnail"
                            onClick={() => openImages(it)}
                            size="sm"
                          />
                          <Thumbnail
                            src={it.back_image_url}
                            alt="Back thumbnail"
                            onClick={() => openImages(it)}
                            size="sm"
                          />
                          <button
                            onClick={() => openImages(it)}
                            disabled={!it.front_image_url && !it.back_image_url}
                            className="ml-auto text-xs px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            View
                          </button>
                        </div>

                        {expanded && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge>Size: {it.size}</Badge>
                            <Badge>Condition: {it.condition}</Badge>
                            <Badge>Donation ID: {it.donation_id ?? "—"}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[960px] text-sm">
                  <thead className="bg-white border-b">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Size</th>
                      <th className="p-3 text-left">Condition</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Donation Req</th>
                      <th className="p-3 text-left">Donation ID</th>
                      <th className="p-3 text-left">Images</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.map((it) => (
                      <tr key={it.clothing_id} className="border-b">
                        <td className="p-3">{it.clothing_id}</td>
                        <td className="p-3">{it.type}</td>
                        <td className="p-3">{it.size}</td>
                        <td className="p-3">{it.condition}</td>
                        <td className="p-3">{it.status}</td>
                        <td className="p-3">#{it.donation_request_id}</td>
                        <td className="p-3">{it.donation_id ?? "—"}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Thumbnail
                              src={it.front_image_url}
                              alt="Front thumbnail"
                              onClick={() => openImages(it)}
                            />
                            <Thumbnail
                              src={it.back_image_url}
                              alt="Back thumbnail"
                              onClick={() => openImages(it)}
                            />
                          </div>
                        </td>
                        <td className="p-3">
                          {it.front_image_url || it.back_image_url ? (
                            <button
                              onClick={() => openImages(it)}
                              className="text-xs px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              View
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Pagination controls */}
        <div className="px-4 py-2 border-t bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-xs text-gray-500">
            Search works across ID, type, size, condition, status and request
            ID.
          </div>

          <div className="flex items-center gap-2 justify-end text-xs">
            <span className="sm:hidden">
              Page <b>{page}</b>/<b>{totalPages}</b>
            </span>
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={page <= 1}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <span className="hidden sm:inline-block px-2">
              Page <b>{page}</b> / <b>{totalPages}</b>
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 min-h-[260px] flex flex-col">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
            Split of clothing types (Available inventory)
          </h4>
          <div className="flex-1 relative">
            {loadingAnalytics ? (
              <div className="text-gray-500 text-sm">Loading chart…</div>
            ) : analyticsError ? (
              <div className="text-red-600 text-sm">{analyticsError}</div>
            ) : analytics && analytics.typeSplit?.length ? (
              <Doughnut data={typeChartData} options={doughnutOptions} />
            ) : (
              <div className="text-gray-500 text-sm">No data to display.</div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 min-h-[260px] flex flex-col">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
            Items contributed by charities (Available inventory)
          </h4>
          <div className="flex-1 relative">
            {loadingAnalytics ? (
              <div className="text-gray-500 text-sm">Loading chart…</div>
            ) : analyticsError ? (
              <div className="text-red-600 text-sm">{analyticsError}</div>
            ) : analytics && analytics.itemsByCharity?.length ? (
              <Doughnut data={charityChartData} options={doughnutOptions} />
            ) : (
              <div className="text-gray-500 text-sm">No data to display.</div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageOpen && imageItem && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeImages}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Item #{imageItem.clothing_id} Images
                  </h3>
                  <p className="text-xs text-gray-600">
                    {imageItem.type} • {imageItem.size} • {imageItem.condition}
                  </p>
                </div>
                <button
                  onClick={closeImages}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="px-3 py-2 text-sm font-semibold border-b bg-white">
                    Front
                  </div>
                  {imageItem.front_image_url ? (
                    <img
                      src={safeImgUrl(imageItem.front_image_url)}
                      alt="Front view"
                      className="w-full h-[320px] object-contain bg-gray-50"
                    />
                  ) : (
                    <div className="h-[320px] flex items-center justify-center text-gray-400">
                      No front image
                    </div>
                  )}
                </div>

                <div className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="px-3 py-2 text-sm font-semibold border-b bg-white">
                    Back
                  </div>
                  {imageItem.back_image_url ? (
                    <img
                      src={safeImgUrl(imageItem.back_image_url)}
                      alt="Back view"
                      className="w-full h-[320px] object-contain bg-gray-50"
                    />
                  ) : (
                    <div className="h-[320px] flex items-center justify-center text-gray-400">
                      No back image
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-4 border-t bg-gray-50 flex justify-end">
                <button
                  onClick={closeImages}
                  className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
