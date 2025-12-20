"use client";

import React from "react";

type BaseConfirmMessage = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: React.ReactNode;
    confirmLabel: string;
    confirmClassName: string;
};

function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel,
    confirmClassName,
}: BaseConfirmMessage) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>

                <div className="text-sm text-gray-700 mb-4">{message}</div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1 border rounded-md text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className={`px-3 py-1 text-white rounded-md text-sm ${confirmClassName}`}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function DeleteDonationRequestModal({
    isOpen,
    onClose,
    onConfirm,
    title,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
}) {

    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Remove Donation Request"
            message={
                <>
                    Are you sure you want to delete{" "}
                    <strong>{title ?? "this request"}</strong>?
                    <br />
                    This action cannot be undone.
                </>
            }
            confirmLabel="Delete"
            confirmClassName="bg-red-600 hover:bg-red-700"
        />
    );

}

export function CharityDeclineDonationRequestModal({
    isOpen,
    onClose,
    onConfirm,
    title,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
}) {
    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Decline Donation Request"
            message={
                <>
                    Are you sure you want to decline{" "}
                    <strong>{title ?? "this donation request"}</strong>?
                </>
            }
            confirmLabel="Decline"
            confirmClassName="bg-yellow-500 hover:bg-yellow-600 text-black"
        />
    );
}

export function CharityInventoryActionConfirm({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel,
    confirmClassName,
}: BaseConfirmMessage) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <h2 className="text-lg font-semibold mb-2">{title}</h2>
                )}

                <div className="text-sm text-gray-700 mb-4">{message}</div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1 border rounded-md text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className={`px-3 py-1 text-white rounded-md text-sm ${confirmClassName}`}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
