"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import uploadImageToCloud from "@/lib/cloud/cloudClient";
import type { DonationRequest } from "@/types/donation";


/* ---------------------------------------
   TYPES
---------------------------------------- */


type ItemState = {
  id: string;
  type: string;
  size: string;
  condition: string;
  frontFile?: File | null;
  backFile?: File | null;
  front_image_url?: string | null;
  back_image_url?: string | null;
};

/* ---------------------------------------
   COMPONENT
---------------------------------------- */
export default function CreateDonationRequestModal({
  isOpen,
  onClose,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;

  // FIXED: must match parent dashboard
  onCreated: (req: DonationRequest) => void;
}) {
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const [items, setItems] = useState<ItemState[]>([
    {
      id: uuidv4(),
      type: "JACKET",
      size: "M",
      condition: "GOOD",
      frontFile: null,
      backFile: null,
    },
  ]);

  /* ---------------------------------------
     ITEM MODIFICATION HELPERS
  ---------------------------------------- */
  function addItemRow() {
    if (items.length >= 5) {
      alert("You can only add up to 5 items per donation request.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "JACKET",
        size: "M",
        condition: "GOOD",
        frontFile: null,
        backFile: null,
      },
    ]);
  }

  function removeItemRow(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function updateItem(id: string, field: keyof ItemState, value: any) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    which: "front" | "back"
  ) {
    const file = e.target.files?.[0] ?? null;

    if (which === "front") updateItem(id, "frontFile", file);
    else updateItem(id, "backFile", file);
  }

  /* ---------------------------------------
     CREATE REQUEST HANDLER
  ---------------------------------------- */
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required.");

    try {
      setCreating(true);

      // Upload images and prepare item objects
      const itemsWithUrls = await Promise.all(
        items.map(async (item) => {
          let frontUrl = null;
          let backUrl = null;

          if (item.frontFile)
            frontUrl = await uploadImageToCloud(item.frontFile);
          if (item.backFile)
            backUrl = await uploadImageToCloud(item.backFile);

          return {
            type: item.type,
            size: item.size,
            condition: item.condition,
            front_image_url: frontUrl,
            back_image_url: backUrl,
          };
        })
      );

      // Send to API
      const res = await fetch("/api/donation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          items: itemsWithUrls,
        }),
      });

      if (!res.ok) throw new Error("Failed to create request");

      const created: DonationRequest = await res.json();

      // FIX: no more unknown type
      onCreated(created);

      onClose();
    } catch (err) {
      alert("Error creating donation request");
      console.error(err);
    } finally {
      setCreating(false);
    }
  }

  if (!isOpen) return null;

  /* ---------------------------------------
     MODAL UI
  ---------------------------------------- */
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Create Donation Request</h3>

        <form onSubmit={handleCreate} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="e.g. Winter jackets for kids"
            />
          </div>

          {/* ITEMS */}
          <div>
            <label className="block text-sm mb-2">Items</label>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-3 items-end border rounded-md p-3"
                >
                  {/* TYPE */}
                  <div className="flex-1">
                    <label className="block text-xs mb-1">Type</label>
                    <select
                      value={item.type}
                      onChange={(e) => updateItem(item.id, "type", e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
                      <option value="JACKET">Jacket</option>
                      <option value="PANTS">Pants</option>
                      <option value="SHIRT">Shirt</option>
                      <option value="SHOES">Shoes</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  {/* SIZE */}
                  <div className="flex-1">
                    <label className="block text-xs mb-1">Size</label>
                    <select
                      value={item.size}
                      onChange={(e) => updateItem(item.id, "size", e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  {/* CONDITION */}
                  <div className="flex-1">
                    <label className="block text-xs mb-1">Condition</label>
                    <select
                      value={item.condition}
                      onChange={(e) =>
                        updateItem(item.id, "condition", e.target.value)
                      }
                      className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
                      <option value="NEW">New</option>
                      <option value="GOOD">Good</option>
                      <option value="WORN">Worn</option>
                    </select>
                  </div>

                  {/* FRONT IMAGE */}
                  <div>
                    <label className="block text-xs mb-1">Front Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, item.id, "front")}
                      className="text-xs"
                    />
                  </div>

                  {/* BACK IMAGE */}
                  <div>
                    <label className="block text-xs mb-1">Back Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, item.id, "back")}
                      className="text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItemRow(item.id)}
                    className="text-xs px-3 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItemRow}
              className="mt-3 text-sm px-3 py-1 rounded-md border border-dashed border-gray-400 hover:bg-gray-50"
            >
              + Add Item
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm rounded-md border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="px-3 py-1 text-sm rounded-md bg-green-700 text-white disabled:opacity-60"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
