/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COMMUNITY_NAME: string;
    readonly VITE_BACKEND_DOMAIN: string;
    readonly VITE_BACKEND_PORT: string;
    readonly VITE_USERNAME_MAX_LENGTH: string;
    readonly VITE_USERNAME_MIN_LENGTH: string;
    readonly VITE_PASSWORD_MAX_LENGTH: string;
    readonly VITE_PASSWORD_MIN_LENGTH: string;
    readonly VITE_ENCRYPT_SECRET: string;
    readonly VITE_SALT_ROUNDS: string;
    readonly VITE_DEFAULT_ROLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
