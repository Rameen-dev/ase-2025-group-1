export async function uploadImageToCloudinary(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: form,
        }
    );

    if (!res.ok) {
        const txt = await res.text().catch(() => "unknown error");
        throw new Error(`Cloudinary upload failed: ${txt}`);
    }

    const data = await res.json();
    return data.secure_url as string;
}