import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function GoBackButton({ href }: { href?: string }) {
    const router = useRouter();
    return (
        <button
        type="button"
        onClick={() => {
            if (href) {
                router.push(href);
            } else if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
            } else {
                router.push("/");
            }
        }}
        className="mb-5 flex items-center gap-1.5 text-[11px] text-auf-muted transition-colors group"
        >
        <ArrowLeft
            className="h-3 w-3 transition-transform group-hover:-translate-x-0.5 group-hover:text-navy"
        />
        <span className="text-[9px] group-hover:text-navy transition-colors font-bold uppercase tracking-[0.22em]">
            Back
        </span>
        </button>
    );
}
