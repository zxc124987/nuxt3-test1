export function useCommon() {
  const loading = useState("loading", () => false);
  const sidebarMenu = useState("sidebarMenu", () => []);
  const userInfo = useState("userInfo", () => null);

  return { loading, sidebarMenu, userInfo };
}