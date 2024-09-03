export function useApp() {
  const loading = useState("loading", () => false);
  const sidebarMenu = useState("sidebarMenu", () => []);
  const isLoggedIn = useState("isLoggedIn", () => false);

  return { loading, sidebarMenu, isLoggedIn };
}