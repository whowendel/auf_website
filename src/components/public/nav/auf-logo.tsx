import Image from "next/image";
import Link from "next/link";

type AufLogoProps = {
    href?: string;
    onClick?: () => void;
    showWordmark?: boolean;
    className?: string;
    logoSizeClassName?: string;
    wordmarkClassName?: string;
    wordmarkTextClassName?: string;
};

export function AufLogo({
    href,
    onClick,
    showWordmark = true,
    className = "",
    logoSizeClassName = "h-16 w-16",
    wordmarkClassName = "",
    wordmarkTextClassName = "text-white",
}: AufLogoProps) {
    const content = (
        <>
        <div className={`relative shrink-0 ${logoSizeClassName}`.trim()}>
            <Image
            src="/assets/auf-logo-only.png"
            alt="Angeles University Foundation logo"
            fill
            className="object-contain"
            priority
            />
        </div>
        {showWordmark ? (
            <div className={`hidden flex-col justify-center sm:flex font-wordmark ${wordmarkClassName}`.trim()}>
            <div className={`flex flex-col leading-[1.05] ${wordmarkTextClassName}`.trim()}>
                <span className="text-[16px] uppercase tracking-widest lg:text-[18px]">
                <b className="font-bold">A</b>
                <span className="text-[14px] lg:text-[16px]">ngeles</span>
                </span>
                <span className="text-[16px] uppercase tracking-widest lg:text-[18px]">
                <b className="font-bold">U</b>
                <span className="text-[14px] lg:text-[16px]">niversity</span>
                </span>
                <span className="text-[16px] uppercase tracking-widest lg:text-[18px]">
                <b className="font-bold">F</b>
                <span className="text-[14px] lg:text-[16px]">oundation</span>
                </span>
            </div>
            </div>
        ) : null}
        </>
    );

    const baseClassName = `flex items-center ${className}`.trim();

    if (href) {
        return (
        <Link href={href} className={baseClassName} onClick={onClick}>
            {content}
        </Link>
        );
    }

    return (
        <div className={baseClassName}>
        {content}
        </div>
    );
}
