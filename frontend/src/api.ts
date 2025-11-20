const API_URL = 'http://127.0.0.1:8000';

export const api = {
    // User endpoints
    createUser: async (userData: any) => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Failed to create user');
        return response.json();
    },

    getUser: async (telegramId: number) => {
        const response = await fetch(`${API_URL}/users/${telegramId}`);
        if (!response.ok) throw new Error('Failed to get user');
        return response.json();
    },

    // Activity endpoints
    createActivity: async (activityData: any) => {
        const response = await fetch(`${API_URL}/activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData),
        });
        if (!response.ok) throw new Error('Failed to create activity');
        return response.json();
    },

    getActivities: async () => {
        const response = await fetch(`${API_URL}/activities`);
        if (!response.ok) throw new Error('Failed to get activities');
        return response.json();
    }
};
