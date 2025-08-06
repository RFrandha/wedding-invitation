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
    
    static async addWish(name: string, message: string): Promise<WishData> {
      try {
        const wishData = {
          name: name.trim(),
          message: message.trim(),
          createdAt: new Date()
        }
        
        const docRef = await addDoc(collection(db, 'wishes'), {
          ...wishData,
          createdAt: Timestamp.fromDate(wishData.createdAt)
        })
        
        return {
          id: docRef.id,
          ...wishData
        }
      } catch (error) {
        console.error('Error adding wish:', error)
        throw error
      }
    }
  }