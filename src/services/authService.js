// Mock auth service — simulates an API call
const MOCK_USERS = [
  {
    id: 'usr_001',
    name: 'Admin User',
    username: 'admin',
    email: 'admin@streamapp.com',
    role: 'Premium Member',
    joinedAt: '2024-01-15',
    password: 'admin@123',
  },
]

const MOCK_TOKEN = 'mock-jwt-token-streamapp-2024'

export const authService = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.username === username && u.password === password
        )
        if (user) {
          const { password: _, ...safeUser } = user
          resolve({ user: safeUser, token: MOCK_TOKEN })
        } else {
          reject(new Error('Invalid username or password'))
        }
      }, 800)
    })
  },
}
