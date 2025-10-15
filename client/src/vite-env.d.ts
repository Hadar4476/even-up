/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_UPLOADS_URL: string;
  readonly VITE_ENV: "development" | "production";
  // Add other variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
