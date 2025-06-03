// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

// // User data interface
// export const UserData = {
//   uid: '',
//   email: '',
//   displayName: '',
//   phone: '',
//   photoURL: '',
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// // Save user data to Firestore after successful signup
// export const saveUserToFirestore = async (uid, userData) => {
//   try {
//     let photoURL = '';
    
//     // Upload photo to Firebase Storage if provided
//     if (userData.photoUri) {
//       const photoRef = storage().ref(`users/${uid}/profile.jpg`);
//       await photoRef.putFile(userData.photoUri);
//       photoURL = await photoRef.getDownloadURL();
//     }

//     // Save user data to Firestore
//     const userDoc = {
//       uid,
//       email: userData.email,
//       displayName: userData.displayName,
//       phone: userData.phone,
//       photoURL,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//       updatedAt: firestore.FieldValue.serverTimestamp(),
//     };

//     await firestore().collection('users').doc(uid).set(userDoc);

//     return { success: true, photoURL };
//   } catch (error) {
//     console.error('Error saving user to Firestore:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Fetch user data from Firestore
// export const getUserFromFirestore = async (uid) => {
//   try {
//     const userDoc = await firestore().collection('users').doc(uid).get();
    
//     if (userDoc.exists) {
//       const userData = userDoc.data();
//       return { success: true, userData };
//     } else {
//       return { success: false, error: 'User not found' };
//     }
//   } catch (error) {
//     console.error('Error fetching user from Firestore:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Update user data in Firestore
// export const updateUserInFirestore = async (uid, updates) => {
//   try {
//     await firestore()
//       .collection('users')
//       .doc(uid)
//       .update({
//         ...updates,
//         updatedAt: firestore.FieldValue.serverTimestamp(),
//       });

//     return { success: true };
//   } catch (error) {
//     console.error('Error updating user in Firestore:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Get user data by email (for login flow)
// export const getUserByEmail = async (email) => {
//   try {
//     const querySnapshot = await firestore()
//       .collection('users')
//       .where('email', '==', email)
//       .limit(1)
//       .get();

//     if (!querySnapshot.empty) {
//       const userData = querySnapshot.docs[0].data();
//       return { success: true, userData };
//     } else {
//       return { success: false, error: 'User not found' };
//     }
//   } catch (error) {
//     console.error('Error fetching user by email:', error);
//     return { success: false, error: error.message };
//   }
// };


import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

// User data interface
export const UserData = {
  uid: '',
  email: '',
  displayName: '',
  phone: '',
  photoURL: '',
  createdAt: null,
  updatedAt: null,
};

// Save user data to Firestore after successful signup
export const saveUserToFirestore = async (
  uid,
  userData
) => {
    console.log("saveUserToFirestore method called ");
  try {
    let photoURL = '';
    
    // Only upload photo if photoUri is provided and not empty
    if (userData.photoUri) {
        console.log("phto available in saveUserToFirestore");
      try {
        console.log('Uploading photo from URI:', userData.photoUri);
        
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `profile_${timestamp}.jpg`;
        const photoRef = storage().ref(`users/${uid}/${filename}`);
        
        // Upload the file
        const uploadTask = await photoRef.putFile(userData.photoUri);
        console.log('Upload completed:', uploadTask.state);
        
        // Get the download URL
        photoURL = await photoRef.getDownloadURL();
        console.log('Photo uploaded successfully:', photoURL);
        
      } catch (photoError) {
        console.error('Error uploading photo:', photoError);
        // Continue without photo if upload fails
        photoURL = '';
      }
    }

    // Save user data to Firestore using the new API
    const userDoc = {
      uid,
      email: userData.email,
      displayName: userData.displayName,
      phone: userData.phone,
      photoURL,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    console.log("userDoc created in saveUserToFirestore");

    // Use the new modular API
    console.log("calling firebase db in saveUserToFirestore")
    const db = firestore();
    await db.collection('users').doc(uid).set(userDoc);
    console.log("user stored successfully in saveUserToFirestore")

    getUserFromFirestore(uid);
    
    
    return { success: true, photoURL, db };
  } catch (error) {
    console.error('Error saving user to Firestore in saveUserToFirestore:', error);
    return { success: false, error: error.message };
  }
};

// Fetch user data from Firestore
export const getUserFromFirestore = async (
  uid
) => {
  try {
    console.log("calling getUserFromFirestore")
    const db = await firestore();

    const userDoc = await db.collection('users').doc(uid).get();

    console.log('User data saved to Firestore successfully in getUserFromFirestore');
    console.log("demo db user Iam here:",userDoc)
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      return { success: true, userData };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching user from Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Update user data in Firestore
export const updateUserInFirestore = async (
  uid,
  updates
) => {
  try {
    const db = firestore();
    await db
      .collection('users')
      .doc(uid)
      .update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.error('Error updating user in Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Get user data by email (for login flow)
export const getUserByEmail = async (
  email
) => {
  try {
    const db = firestore();
    const querySnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { success: true, userData };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return { success: false, error: error.message };
  }
};

// export const getUserPhoneNumber = async () => {
//   try {
//     const currentUser = auth().currentUser;
//     console.log("current user from phone number ",currentUser);
//         if (!currentUser) {
//       console.log('No authenticated user found.');
//       return null;
//     }

//     const userDoc = await firestore().collection('users').doc(currentUser.uid).get();

//     if (userDoc.exists) {
//       const userData = userDoc.data();
//       console.log("phone number see",userData.phone);
//       return userData.phone || null;
//     } else {
//       console.log('User document does not exist.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching phone number:', error);
//     return null;
//   }
// }


export const getUserPhoneNumber = async (uid) => {
  try {
    const userDoc = await firestore().collection('users').doc(uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log('found userdata from email', userData);
      console.log('phone number see', userData?.phone);
      return userData?.phone || null;
    } else {
      console.log('User document does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching phone number:', error);
    return null;
  }
};

export const getUserEmail = async (uid) => {
  try {
    const userDoc = await firestore().collection('users').doc(uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return userData?.email || null;
    } else {
      console.log('User document does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching email:', error);
    return null;
  }
};




export const validatePhotoUri = (uri) => {
  if (!uri) return false;
  
  return uri.startsWith('file://') || uri.startsWith('content://') || uri.startsWith('/');
};