import type { ReactNode, SVGProps } from "react";

import { cn } from "@/lib/utils/cn";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

interface LineIconProps extends IconProps {
  children: ReactNode;
}

function LineIcon({
  size = 20,
  className,
  children,
  ...props
}: LineIconProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </LineIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" />
    </LineIcon>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </LineIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </LineIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </LineIcon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 6v12M6 12h12" />
    </LineIcon>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M6 12h12" />
    </LineIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m5 13 4 4L19 7" />
    </LineIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </LineIcon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </LineIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </LineIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m9 6 6 6-6 6" />
    </LineIcon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m15 6-6 6 6 6" />
    </LineIcon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.6c0 5-7 9.4-7 9.4Z" />
    </LineIcon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </LineIcon>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M2.1 12.3a1 1 0 0 1 0-.6 10.8 10.8 0 0 1 19.8 0 1 1 0 0 1 0 .6 10.8 10.8 0 0 1-19.8 0" />
      <circle cx="12" cy="12" r="3" />
    </LineIcon>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </LineIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </LineIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M8 4H5a1 1 0 0 0-1 1c0 8.3 6.7 15 15 15a1 1 0 0 0 1-1v-3l-3.2-1.1-1.7 1.7a13 13 0 0 1-5.7-5.7l1.7-1.7L8 4Z" />
    </LineIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </LineIcon>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 6h10v9H3z" />
      <path d="M13 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </LineIcon>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 12a8 8 0 1 0 2.3-5.6" />
      <path d="M4 4v4h4" />
    </LineIcon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </LineIcon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="m6 7 1 13h10l1-13" />
      <path d="M10 11v5M14 11v5" />
    </LineIcon>
  );
}

export function UndoIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m9 5-5 5 5 5" />
      <path d="M4 10h10a5 5 0 0 1 0 10h-2" />
    </LineIcon>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </LineIcon>
  );
}

export function LoaderIcon(props: IconProps) {
  return (
    <LineIcon {...props} className={cn("animate-spin", props.className)}>
      <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </LineIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </LineIcon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.4V5c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3h2.6v7h2.4Z"
      />
    </LineIcon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.2L4 20Z" />
      <path d="M9 9.5c.2 2.4 2.1 4.3 4.5 4.5l1-1.6-1.7-.8-.8.8c-.9-.4-1.6-1.1-2-2l.8-.8-.8-1.7-1 .6Z" />
    </LineIcon>
  );
}
