export function useCommon() {
  const loading = useState("loading", () => false);

  return { loading };
}