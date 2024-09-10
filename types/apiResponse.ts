export interface ApiResponse {
  message: string;
  page_auth: boolean | null;
  result_list: object[];
  result_obj: object | null | any;
  success: boolean
}