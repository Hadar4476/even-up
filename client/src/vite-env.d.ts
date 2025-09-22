/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENV: "development" | "production";
  // Add other variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
