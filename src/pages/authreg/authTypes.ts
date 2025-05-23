export interface AuthData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    // Другие поля ответа, если есть
}