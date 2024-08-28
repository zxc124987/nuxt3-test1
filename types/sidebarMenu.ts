export interface SidebarMenu {
  children_items: SidebarMenu[];
  ma_permission: number;
  mi_code: string;
  mi_name: string;
  mi_order_no: number;
  mi_path: string;
  mi_sid: string;
  mi_type: number;
  sel_type: any;
  indexKey: string | undefined;
}