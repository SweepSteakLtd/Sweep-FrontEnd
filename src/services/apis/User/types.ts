export interface User {
  id: string; // required
  first_name?: string; // optional, default ""
  last_name?: string; // optional, default ""
  email: string; // required
  bio?: string; // optional, default ""
  profile_picture?: string; // optional, default ""
  phone_number?: string; // optional, default ""
  game_stop_id?: string; // optional, default ""
  is_auth_verified?: boolean; // optional, default false
  is_identity_verified?: boolean; // optional, default false
  deposit_limit?: number; // optional, default 0
  betting_limit?: number; // optional, default 0
  payment_id?: string; // optional, default ""
  current_balance?: number; // optional, default 0
  created_at?: Date;
  updated_at?: Date;
}
