export function useApp1() {
  const loading = useState("loading", () => false);

  return { loading };
}