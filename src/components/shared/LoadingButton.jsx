import { forwardRef } from "react";
import Spinner from "./Spinner";

/**
 * LoadingButton Component
 * 
 * An enhanced button that shows a loading spinner during async operations.
 * Fully backward compatible - behaves exactly like a normal button when not loading.
 * 
 * Props:
 *   - loading: boolean - shows spinner and disables the button
 *   - loadingText: string - optional text to show while loading (defaults to children)
 *   - ...rest: all standard button props (onClick, type, className, disabled, etc.)
 * 
 * Features:
 *   - Prevents double-clicks when loading
 *   - Maintains button width to prevent layout shift
 *   - Sets aria-busy for accessibility
 *   - Supports ref forwarding
 * 
 * Usage:
 *   <LoadingButton loading={isLoading} onClick={handleClick}>
 *     Save Changes
 *   </LoadingButton>
 * 
 *   <LoadingButton loading={isLoading} loadingText="Saving...">
 *     Save Changes
 *   </LoadingButton>
 */

const LoadingButton = forwardRef(
  (
    {
      loading = false,
      loadingText,
      children,
      disabled = false,
      className = "",
      onClick,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // Prevent click when loading
    const handleClick = (e) => {
      if (loading) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    // Determine button content
    const buttonContent = loading ? (
      <>
        <Spinner />
        <span className="ml-2">{loadingText || children}</span>
      </>
    ) : (
      children
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={handleClick}
        className={className}
        aria-busy={loading}
        {...rest}
      >
        {buttonContent}
      </button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
