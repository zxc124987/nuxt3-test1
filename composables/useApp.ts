export function useApp() {
  const loading = useState("loading", () => false);

  return { loading };
}