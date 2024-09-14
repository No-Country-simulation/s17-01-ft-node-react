interface Uploader {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  rating: number | null;
  status: boolean;
  avatar: string;
}

export interface Component {
  id: number;
  name: string;
  price: number;
  styles: string;
  structure: string;
  tier: "bronze" | "silver" | "gold";
  rating: number;
  description: string;
  video: string;
  image: string;
  readme: string;
  downloads: number;
  uploader: Uploader;
}

export interface GetComponentsResponse {
  components: Component[];
}
