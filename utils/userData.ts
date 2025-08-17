import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: string;
  location?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    locationSharing: boolean;
    autoLocation: boolean;
    sound: boolean;
    vibration: boolean;
  };
  friends: string[];
  favorites: string[];
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastMessage: string;
  lastSeen: string;
  distance: string;
  isFavorite: boolean;
  mutualFriends: number;
  location?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
}

export interface Place {
  id: string;
  name: string;
  type: 'park' | 'cafe' | 'restaurant' | 'mall' | 'station' | 'other';
  coordinate: {
    latitude: number;
    longitude: number;
  };
  distance: string;
  rating?: number;
  description?: string;
}

class UserDataManager {
  private static instance: UserDataManager;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): UserDataManager {
    if (!UserDataManager.instance) {
      UserDataManager.instance = new UserDataManager();
    }
    return UserDataManager.instance;
  }

  // User Management
  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
    return null;
  }

  async setCurrentUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  async updateUserPreferences(preferences: Partial<User['preferences']>): Promise<void> {
    if (!this.currentUser) return;

    this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
    await this.setCurrentUser(this.currentUser);
  }

  async updateUserLocation(location: User['location']): Promise<void> {
    if (!this.currentUser) return;

    this.currentUser.location = location;
    await this.setCurrentUser(this.currentUser);
  }

  // Friends Management
  async getFriends(): Promise<Friend[]> {
    try {
      const friendsData = await AsyncStorage.getItem('friends');
      return friendsData ? JSON.parse(friendsData) : [];
    } catch (error) {
      console.error('Error getting friends:', error);
      return [];
    }
  }

  async setFriends(friends: Friend[]): Promise<void> {
    try {
      await AsyncStorage.setItem('friends', JSON.stringify(friends));
    } catch (error) {
      console.error('Error setting friends:', error);
    }
  }

  async addFriend(friend: Friend): Promise<void> {
    const friends = await this.getFriends();
    friends.push(friend);
    await this.setFriends(friends);
  }

  async removeFriend(friendId: string): Promise<void> {
    const friends = await this.getFriends();
    const updatedFriends = friends.filter(friend => friend.id !== friendId);
    await this.setFriends(updatedFriends);
  }

  async toggleFavorite(friendId: string): Promise<void> {
    const friends = await this.getFriends();
    const friendIndex = friends.findIndex(friend => friend.id === friendId);
    
    if (friendIndex !== -1) {
      friends[friendIndex].isFavorite = !friends[friendIndex].isFavorite;
      await this.setFriends(friends);
    }
  }

  // Places Management
  async getPlaces(): Promise<Place[]> {
    try {
      const placesData = await AsyncStorage.getItem('places');
      return placesData ? JSON.parse(placesData) : [];
    } catch (error) {
      console.error('Error getting places:', error);
      return [];
    }
  }

  async setPlaces(places: Place[]): Promise<void> {
    try {
      await AsyncStorage.setItem('places', JSON.stringify(places));
    } catch (error) {
      console.error('Error setting places:', error);
    }
  }

  async addPlace(place: Place): Promise<void> {
    const places = await this.getPlaces();
    places.push(place);
    await this.setPlaces(places);
  }

  // Recent Activity
  async getRecentActivity(): Promise<any[]> {
    try {
      const activityData = await AsyncStorage.getItem('recentActivity');
      return activityData ? JSON.parse(activityData) : [];
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return [];
    }
  }

  async addActivity(activity: any): Promise<void> {
    const activities = await this.getRecentActivity();
    activities.unshift(activity);
    
    // Keep only last 50 activities
    if (activities.length > 50) {
      activities.splice(50);
    }
    
    try {
      await AsyncStorage.setItem('recentActivity', JSON.stringify(activities));
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        'currentUser',
        'friends',
        'places',
        'recentActivity'
      ]);
      this.currentUser = null;
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  // Utility functions
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  formatDistance(distance: number): string {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    } else {
      return `${distance.toFixed(1)}km away`;
    }
  }

  getTimeAgo(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
  }
}

export default UserDataManager.getInstance();
