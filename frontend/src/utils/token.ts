export const getAccessToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
};

export const getRefreshToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
};

export const setTokens = (access: string, refresh: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }
};

export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};
