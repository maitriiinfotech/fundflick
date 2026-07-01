import ErrorScreen from "./components/ui/ErrorScreen";

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="Page not found"
      message="The page you're looking for doesn't exist or has moved. We'll take you back home."
    />
  );
}
