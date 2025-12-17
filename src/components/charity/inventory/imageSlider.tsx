"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ClothingItem } from "@/types/donation";

const slideVariants = {
    enter: { x: 40, opacity: 0 }, //makes image slide in from the right
    center: { x: 0, opacity: 1 }, //centers image
    exit: { x: -40, opacity: 0 }, //makes image leave to the left
};

type ImageSliderProps = {
    item: ClothingItem;
    isDraftMode: boolean;
    isSelected: boolean;
    onToggleSelect: (id: number) => void;
};

//for each item, onClick function which switches between front and back image 
export default function ImageSlider({
    item,
    isDraftMode,
    isSelected,
    onToggleSelect,
}: ImageSliderProps) {

    //boolean, when if TRUE = front image is showing and if FALSE = back image is showing
    const [showFront, setShowFront] = useState(true);

    //grab image URL from item
    const front = item.front_image_url;
    const back = item.back_image_url;

    //only allow flipping when both images exist
    const canFlip = Boolean(front && back);
    //based on showFront being true or false, choose which image to show
    const activeImage = showFront ? front : back;

    function handleCardClick() {
        if (!isDraftMode) return;
        onToggleSelect(item.clothing_id);
    }
    //event handler
    function handleNext() {
        if (!canFlip) return;
        setShowFront((prev) => !prev);
    }

    return (
        <div
            className={`p-2 m-2 rounded-md transition cursor-pointer ${isDraftMode ? "border" : ""
                } ${isSelected
                    ? "border-green-600 ring-2 ring-green-200"
                    : "border-transparent"
                }`}
            onClick={handleCardClick}
        >
            <div
                className="relative mb-1 h-50 w-full overflow-hidden rounded-md bg-gray-100 cursor-pointer"
            >
                {activeImage ? (
                    <AnimatePresence initial={false} mode="popLayout">
                        <motion.div
                            key={activeImage}
                            //calling slide variants from the top of the file
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={activeImage}
                                alt={`${item.type} ${showFront ? "front" : "back"}`}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                        No image
                    </div>
                )}

                {/* Only if canFlip is true (front and back image exists), show arrow to switch image */}
                {canFlip && (
                    <div className="absolute inset-y-0 right-1 flex items-center">
                        <div className="rounded bg-black/5 hover:bg-black/30 transition-colors duration-200 px-1 py-2 h-full"
                            onClick={handleNext}>
                            <svg
                                viewBox="0 0 24 24"
                                className="h-full w-5"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold truncate">{item.type}</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[13px]">
                    {item.size}
                </span>
            </div>

            <p className="mt-1 text-xs text-gray-600 truncate">
                Wear: {item.condition}
            </p>
        </div>
    )
}