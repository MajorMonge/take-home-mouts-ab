import { User } from '../types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json();
}

export const getAllUsers = async (): Promise<User[]> => {
    return fetchWithErrorHandling<User[]>(`${API_URL}/users`);
};

export const getUserById = async (id: string): Promise<User> => {
    return fetchWithErrorHandling<User>(`${API_URL}/users/${id}`);
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    return fetchWithErrorHandling<User>(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
};

export const updateUser = async ({ id, ...data }: User): Promise<User> => {
    return fetchWithErrorHandling<User>(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};
