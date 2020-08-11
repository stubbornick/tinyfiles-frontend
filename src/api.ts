import axios from 'axios';
import urljoin from 'url-join';

const baseURL = process.env.REACT_APP_API_URL || '/api'

export const getDownloadLink = (fileId: string, fileName: string) => {
  return urljoin(baseURL, 'files/download', fileId, fileName);
}

export default axios.create({
  baseURL
});
