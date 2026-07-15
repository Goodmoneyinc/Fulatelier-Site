import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { navLinks, social } from "@/lib/constants";

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12.5 3.5H14.5V1H12.25C9.9 1 8.5 2.55 8.5 5V7H6.5V9.75H8.5V19H11.25V9.75H13.75L14.5 7H11.25V5.25C11.25 4.35 11.55 3.5 12.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="17"
        height="17"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5.5 8.25V14.5M5.5 5.75V5.76"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M9 14.5V8.25H9C10.35 8.25 11.5 9.4 11.5 10.75V14.5M11.5 10.75C11.5 9.4 12.65 8.25 14 8.25H14.25V14.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/**
 * Site-wide footer — tonal navy (`footerBg`), gold top rule, three columns.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent bg-footer text-subtle">
      <div className="container-fulatelier py-section-mobile lg:py-section-desktop">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          <div>
            <a
              href="#main-content"
              className="inline-flex items-center gap-3 text-subtle transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
            >
              <LogoMark className="h-9 w-9 shrink-0" />
              <span className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-text">
                Fulatelier LLC
              </span>
            </a>
            <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-subtle">
              Precision Crafted. Purpose Built.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3 lg:items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-inter text-xs font-medium uppercase tracking-[0.15em] text-subtle transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6 lg:items-end">
            <Button href="#contact" variant="outline">
              Start Your Project
            </Button>
            <div className="flex items-center gap-4">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition-colors duration-200 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                aria-label="Fulatelier on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition-colors duration-200 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                aria-label="Fulatelier on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-subtle/20">
        <div className="container-fulatelier flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-inter text-xs text-subtle">
            © {year} Fulatelier LLC
          </p>
          <p className="font-inter text-xs text-subtle">Jackson, MS</p>
        </div>
      </div>
    </footer>
  );
}
