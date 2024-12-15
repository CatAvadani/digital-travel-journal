export interface Postcard {
  userId: string;
  image: string | null;
  template: number;
  message: string;
  shareableURL?: string;
}
