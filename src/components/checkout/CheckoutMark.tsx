/**
 * Central visual element of the checkout wrapper.
 *
 * SWAP POINT: replace the contents of the <svg> below with the exact
 * user-provided SVG artwork. Keep the wrapper <span> classes so the entrance
 * and float animations continue to apply, and keep `aria-hidden` on the svg.
 */
export function CheckoutMark({ size = 132 }: { size?: number }) {
  return (
    <span className="checkout-mark block" style={{ width: size, height: size }}>
      <span className="checkout-mark-float block h-full w-full">
        <svg
          viewBox="0 0 96 96"
          width={size}
          height={size}
          fill="none"
          aria-hidden="true"
          focusable="false"
          shapeRendering="geometricPrecision"
          className="block h-full w-full"
        >
          <rect
            x="14.5"
            y="30.5"
            width="67"
            height="51"
            rx="10"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.9"
          />
          <path
            d="M32 30V22a16 16 0 0 1 32 0v8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M38 56.5 45.5 64 60 49.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
