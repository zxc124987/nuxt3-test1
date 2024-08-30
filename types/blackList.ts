export interface BlackList {
  bl_pid: string;
  chan_sids: string[];
  pi_firstname: string;
  pi_lastname: string;
  bl_memo: string;
  md_user_name: string;
  md_date: string;
  chan_short_names?: string[];
  pi_name?: string;
  pi_name_mask?: string;
  chan_name?: string;
  md_date_min?: string;
  md_date_max?: string;
}