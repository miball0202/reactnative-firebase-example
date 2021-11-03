import { db } from 'src/clients/firebase';
import {
  doc,
  collection,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Post } from 'src/types/post';

export const postRef = (uid: string, id: string) => {
  return doc(db, `users/${uid}/posts/${id}`);
};

export const postsRef = (uid: string) => {
  return collection(db, `users/${uid}/posts`);
};

export const getPost = (uid: string, id: string) => {
  return getDoc(postRef(uid, id));
};

export const addPost = (uid: string, post: Post) => {
  return addDoc(postsRef(uid), {
    ...post,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  });
};

export const savePost = (uid: string, id: string, post: Post) => {
  return setDoc(postRef(uid, id), {
    ...post,
    updatedAt: serverTimestamp() as Timestamp,
  });
};

export const deletePost = (uid: string, id: string) => {
  return deleteDoc(postRef(uid, id));
};
