export function CheckoutProgress() {
  return (
    <div
      role="status"
      aria-label="Preparing secure checkout"
      aria-live="polite"
      className="checkout-bar relative h-[3px] w-[160px] overflow-hidden rounded-full"
    >
      <span
        aria-hidden="true"
        className="checkout-bar-fill absolute inset-y-0 left-0 block w-[42%] rounded-full"
      />
    </div>
  );
}
