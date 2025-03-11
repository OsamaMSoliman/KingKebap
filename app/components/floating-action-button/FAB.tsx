import { ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function FAB() {
  return (
    <Button
      className="fixed right-4 bottom-4 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all hover:bg-blue-700"
      size="icon"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
}
