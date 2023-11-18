/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_API_HOST: string;
  readonly VITE_BASE: string;
  readonly VITE_SOURCE: "default" | "mp";
  readonly VITE_OUT_DIR: string;
  readonly VITE_APPID_WEIXIN: string;
  readonly VITE_APPID_ALIPAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
