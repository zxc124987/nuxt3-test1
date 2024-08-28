export function useApp() {
  const loading = useState("loading", () => false);
  const sidebarMenu = useState("sidebarMenu", () => []);

  return { loading, sidebarMenu };
}