// app/lib/datasetMapper.js
export const datasetMapper = {
  INR: {
    datasetId: process.env.META_DATASET_ID_INDIA,
    accessToken: process.env.META_ACCESS_TOKEN_INDIA,
  },
  USD: {
    datasetId: process.env.META_DATASET_ID,
    accessToken: process.env.META_ACCESS_TOKEN,
  },

};
