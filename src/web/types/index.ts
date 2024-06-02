export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Site {
  _id: string;
  name: string;
  region: string;
  lat: number;
  long: number;
  description?: string;
}

export interface Log {
  _id: string;
  user: User;
  site: Site;
  createdAt: Date;
  action: string;
  details: {
    name?: string;
    region?: string;
    lat?: number;
    long?: number;
    description?: string;
  };
}
