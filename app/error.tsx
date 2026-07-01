"use client";

import { useEffect } from "react";
import ErrorScreen from "./components/ui/ErrorScreen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for logging/monitoring.
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      title="Something went wrong"
      message="An unexpected error occurred. You can try again, or we'll take you back home."
      onRetry={reset}
    />
  );
}
