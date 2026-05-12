import Image from "next/image";
import { fetchCountries } from "@/lib/backend/api";

export default async function Home() {
  const posts = await fetchCountries();

  return (
    <div>
      Home
    </div>
  );
}
