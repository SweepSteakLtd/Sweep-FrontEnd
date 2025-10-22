export interface Tournament {
  id: string;
  name: string;
  year: number;
  imageUrl: string;
  category: string;
}

export interface TournamentsResponse {
  data: Tournament[];
}
