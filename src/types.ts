export type CompanyType = {
  id: number;
  name: string;
  slug: string;
  timezone: string;
};

export type CheckInType = {
  id: number;
  start: string;
  status: string;
};

export type ConcernActivityType = {
  created_at: string;
  status?: number;
  comment?: string;
  admin_name?: string;
};

export type ConcernType = {
  created_at: string;
  tracking: string;
  details: string;
  issues: number[];
  activity: ConcernActivityType[];
};
