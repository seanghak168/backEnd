export interface Post {
  key: string;
  title: string;
  permalink: string;
  category: {
    categoryId: string;
    category: string;
  };
  location?:{
    locationID: string;
    location: string;
  }
  postImgPath: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createAt: Date;
  keywords?: any;
}
