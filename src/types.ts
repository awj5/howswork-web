export type CompanyType = {
  id: number;
  name: string;
  slug: string;
  timezone: string;
};

export type CheckInStatType = {
  title: string;
  primary: number;
  secondary: number;
  primaryText?: string;
};

export type CheckInIssueType = {
  id: number;
  count: number;
};

export type CheckInType = {
  id: number;
  start: string;
  status: number;
  stats?: CheckInStatType[];
  issues?: CheckInIssueType[];
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
  issues: number[];
  details: string;
  activity: ConcernActivityType[];
};
