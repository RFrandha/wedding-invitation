export interface WishData {
    id: string;
    name: string;
    message: string;
    createdAt: Date;
  }
  
  // Optional: If you need additional types for the wedding invitation
  export interface WishFormData {
    name: string;
    message: string;
  }
  
  export interface FirebaseWishData {
    name: string;
    message: string;
    createdAt: any; // Firebase Timestamp
  }