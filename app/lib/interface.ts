export interface Post {
  title: string;
  overview: string;
  content: any;
  _id: string;
  featured_image: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  _createdAt: string;
}
