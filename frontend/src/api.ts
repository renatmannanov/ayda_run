const API_URL = 'http://localhost:8000';

export const api = {
    // User endpoints
    createUser: async (userData: any) => {
        console.log('Creating user:', userData);
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
        console.log(`Fetching activities from ${API_URL}/activities...`);
        try {
            const response = await fetch(`${API_URL}/activities`);
            console.log('Response status:', response.status);
            if (!response.ok) {
                const text = await response.text();
                console.error('Error response:', text);
                throw new Error('Failed to get activities');
            }
            const data = await response.json();
            console.log('Activities data:', data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
};
