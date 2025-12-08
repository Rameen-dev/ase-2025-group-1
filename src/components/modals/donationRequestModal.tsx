"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";  //ID used for React list rendering, not shown in front end
import uploadImageToCloud from "@/lib/cloud/cloudClient";

//represents the clothing item row 
type ItemState = {
  //unique ID for React list rendering
  id: string;

  //dropdowns which represent the clothing item (type, size, condition)
  type: string;
  size: string;
  condition: string;

  //selected files for front and back of the clothing item
  //URLs are saved in the database, not shown in the donation request
  frontFile?: File | null;
  backFile?: File | null;
  front_image_url?: string | null;
  back_image_url?: string | null;
};

export default function CreateDonationRequestModal({
  isOpen,
  onClose,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;

  // FIXED: must match parent dashboard
  onCreated: (req: ItemState) => void;
}) {
  //when opening after closing, it resets the modal, calling reset open function when isOpen = true
  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);


  //title of the donation request
  const [title, setTitle] = useState("");
  //used for disabling submit button and showing "Loading" to user
  const [creating, setCreating] = useState(false);
  //uploaded boolean, to show the user they have uploaded a file successfully
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [error, seterror] = useState<string | null>(null);

  //list of clothing item
  const [items, setItems] = useState<ItemState[]>([
    {
      id: uuidv4(),
      type: "SELECT",
      size: "SELECT",
      condition: "SELECT",
      frontFile: null,
      backFile: null,
    },
  ]);

  //function used in "Add item" button
  //Creating a new row
  function addItemRow() {

    //Ensures maximum of 5 items per donation request
    if (items.length >= 5) {
      seterror("You can only add up to 5 items per donation request.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: uuidv4(), //random unique ID
        type: "SELECT",  //default selections upon row creation, user is free to change them
        size: "SELECT",
        condition: "SELECT",
        frontFile: null,
        backFile: null,
      },
    ]);
  }

  //removes item row using it's ID
  function removeItemRow(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function updateItem(id: string, field: keyof ItemState, value: unknown) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  }

  //called when user uploads a file in one of the two inputs Front/Back
  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    which: "front" | "back"
  ) {
    const file = e.target.files?.[0] ?? null;

    //update the correct image field, depening on whether user uploaded a front or back image
    if (which === "front") {
      updateItem(id, "frontFile", file);
    } else {
      updateItem(id, "backFile", file);
    }

    //when uploading, set value to true
    setUploaded(prev => ({
      ...prev,
      [`${id}-${which}`]: true,
    }));
  }

  //function used in "Create" button in donation request
  //Upon clicking Create, send images to the cloud and data to the API
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    seterror(null);

    //ensures user enters a title
    if (!title.trim()) {
      seterror("Title is required");
      return;
    }

    //ensures user has selected all fields for all items in donation request
    const unSelected = items.some((item) => item.type === "SELECTED" || item.size === "SELECT" || item.condition === "SELECT");
    if (unSelected) {
      seterror("Please select type, size, and condition for all items.");
      return;
    }


    //ensures user has uploaded images for all items
    for (const [index, item] of items.entries()) {
      if (!item.frontFile || !item.backFile) {
        seterror(`Item #${index + 1} must have BOTH front and back images.`);
        return
      }
    }
    try {
      setCreating(true);

      const itemsWithUrls = await Promise.all(
        items.map(async (item) => {
          let frontUrl = null;
          let backUrl = null;

          //calls function in cloudClient.ts in lib
          //uploads file to cloud and returns a URL
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

      //calls API
      //sends final data (title and items with the URLs) to API
      const res = await fetch("/api/donation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          items: itemsWithUrls,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        seterror(data.error ?? "Failed to create donation request");
        return;
      }

      // parse response and notify parent component
      onCreated(data);
      onClose(); //close modal on success
    } catch (err) {
      console.error(err);
      seterror("Error creating donation request");
    } finally {
      setCreating(false);
    }
  }

  if (!isOpen) return null;

  //reset modal function, when triggered, window opens fresh
  function resetModal() {
    setTitle("");
    setItems([
      {
        id: uuidv4(),
        type: "SELECT",
        size: "SELECT",
        condition: "SELECT",
        frontFile: null,
        backFile: null,
      }
    ]);
    setUploaded({});
    seterror(null);
  }
  //modal content
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </p>
        )}
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
                      <option value="SELECT" disabled> SELECT</option>
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
                      <option value="SELECT" disabled> SELECT</option>
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
                      <option value="SELECT" disabled> SELECT</option>
                      <option value="NEW">New</option>
                      <option value="GOOD">Good</option>
                      <option value="WORN">Worn</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 min-w-[100px]">

                    {uploaded[`${item.id}-front`] && (
                      <span className="text-[10px] text-green-600 font-medium">
                        File uploaded
                      </span>
                    )}
                    <label className="inline-flex items-center justify-center px-3 py-2 max-h-10 text-xs border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer">
                      Front
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e, item.id, "front")
                        }
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-1 min-w-[100px]">

                    {uploaded[`${item.id}-back`] && (
                      <span className="text-[10px] text-green-600 font-medium">
                        File uploaded
                      </span>
                    )}
                    <label className="inline-flex items-center justify-center px-3 py-2 max-h-10 text-xs border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer">
                      Back
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e, item.id, "back")
                        }
                        className="hidden"
                      />
                    </label>
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
