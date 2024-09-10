export function useCommon() {
  const loading = useState("loading", () => false);
  const menu = useState("menu", () => []);

  return { loading, menu };
}