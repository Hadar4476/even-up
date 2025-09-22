const env = import.meta.env;

const config = {
  apiUrl: env.VITE_API_URL,
  enviroment: env.VITE_ENV,
};

export default config;
