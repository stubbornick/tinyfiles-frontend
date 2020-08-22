import axios from 'axios';
import urljoin from 'url-join';

const baseURL = process.env.REACT_APP_API_URL || '/api';

export const getDownloadLink = (fileId: string, fileName: string): string => {
  return urljoin(baseURL, 'files/download', fileId, fileName);
};

export const api = axios.create({
  baseURL,
});
