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
  type: string;
  admin?: boolean;
};

export type ConcernType = {
  tracking: string;
  details: string;
  created_at: string;
  issues: number[];
  activity: ConcernActivityType[];
};
