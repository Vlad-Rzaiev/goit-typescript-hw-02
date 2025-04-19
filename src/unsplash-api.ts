import axios from 'axios';

export type Image = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
  likes: number;
  user: {
    name: string;
    location: string;
    profile_image: {
      small: string;
    };
  };
};

export type APIResponse = {
  results: Image[];
  total: number;
  total_pages: number;
};

export const fetchPhotos = async (
  searchQuery: string,
  currentPage: number
): Promise<APIResponse> => {
  const KEY = 'DrZnSkUb4VnNsY7jTJRSRwISgkAKgYIS3odPJTW8878';

  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: KEY,
      query: searchQuery,
      orientation: 'landscape',
      per_page: 18,
      page: currentPage,
    },
  });

  return response.data;
};
