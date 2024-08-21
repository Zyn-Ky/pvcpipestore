export default async function CheckCloudinaryStatus() {
  try {
    const fetched = await fetch("https://cloudinary.com");
    if (fetched.status === 200 || fetched.status === 301) return { ok: true };
    return { ok: false };
  } catch {
    return { ok: false };
  }
}
