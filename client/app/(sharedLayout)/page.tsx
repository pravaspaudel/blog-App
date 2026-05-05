import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>hello from layout.tsx</h1>
      <Link href="/contact/abc">go to /contact/abc</Link>
    </div>
  );
}
