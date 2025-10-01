import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    Timestamp 
  } from 'firebase/firestore'
  import { db } from './firebase'
  import { WishData } from './types'
  
  export class FirebaseService {
    static async getWishes(): Promise<WishData[]> {
      try {
        const wishesQuery = query(
          collection(db, 'wishes'),
          orderBy('createdAt', 'desc')
        )
        
        const querySnapshot = await getDocs(wishesQuery)
        const wishes: WishData[] = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          wishes.push({
            id: doc.id,
            name: data.name,
            message: data.message,
            createdAt: data.createdAt.toDate()
          })
        })
        
        return wishes
      } catch (error) {
        console.error('Error fetching wishes:', error)
        throw error
      }
    }
    
    static async addWish(wishData: { name: string; message: string; timestamp: string }): Promise<WishData> {
      try {
        const processedWishData = {
          name: wishData.name.trim(),
          message: wishData.message.trim(),
          createdAt: new Date(wishData.timestamp)
        }
        
        const docRef = await addDoc(collection(db, 'wishes'), {
          ...processedWishData,
          createdAt: Timestamp.fromDate(processedWishData.createdAt)
        })
        
        return {
          id: docRef.id,
          ...processedWishData
        }
      } catch (error) {
        console.error('Error adding wish:', error)
        throw error
      }
    }
  }