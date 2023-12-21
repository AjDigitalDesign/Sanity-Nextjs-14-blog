export interface Post {
  category: {
    title: string;
  };
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

export interface Category {
  title: string;
}

export interface categories {
  title: string;
}
