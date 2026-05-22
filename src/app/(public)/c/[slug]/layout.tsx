// College microsites get their own layout — no shared public header/footer.
// The microsite provides its own header (MicrositeHeader) and footer (MicrositeFooter).
export default function MicrositeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
