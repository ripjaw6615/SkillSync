// src/skills.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

// Add a new skill
export const addSkill = async ({ title, description, level, user_email }) => {
  const docRef = await addDoc(collection(db, "skill"), {
    title,
    description,
    level,
    user_email,
    trust: 0
  });
  return docRef.id;
};

// Get all skills (for home page)
export const getAllSkills = async () => {
  const snapshot = await getDocs(collection(db, "skill"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Get all people for a particular skill (skill group)
export const getSkillsByTitle = async (title) => {
  const q = query(
    collection(db, "skill"),
    where("title", "==", title)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Get all skills of one user (for profile page)
export const getSkillsByUser = async (email) => {
  const q = query(
    collection(db, "skill"),
    where("user_email", "==", email)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Send connection request
export const sendConnectionRequest = async ({
  fromEmail,
  toEmail,
  skillTitle,
}) => {
  await addDoc(collection(db, "connections"), {
    from_user_email: fromEmail,
    to_user_email: toEmail,
    skill_title: skillTitle,
    status: "pending",
    created_at: serverTimestamp(),
  });
};
