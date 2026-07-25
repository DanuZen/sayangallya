import BucketList from "@/components/BucketList";
import FloatingQuickAccess from "@/components/FloatingQuickAccess";

export default function BucketPage() {
  return (
    <main className="min-h-screen relative">
      <BucketList />
      <FloatingQuickAccess />
    </main>
  );
}
