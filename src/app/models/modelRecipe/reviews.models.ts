export interface Review {
  user: {
    id: number;
    firstname: string;
  };
  comment: string;
  rating: number;
}
