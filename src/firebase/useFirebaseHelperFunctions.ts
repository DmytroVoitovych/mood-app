import { getAuth } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { MoodForm } from "~/composables/globalMoodState";

export const useDataBaseByFirebase = () => {
  const db = getFirestore();
  const uid = getAuth().currentUser?.uid;
  const { loading } = useGlobalLoadingState();

  const addData = (data: { [x in string]: MoodForm }, successCallback: () => void) => {
    if (!uid) {
      console.error("User is not authenticated.");
      return Promise.reject(new Error("User is not authenticated."));
    }
    return addDoc(collection(db, "users", uid, "mood-data"), data)
      .then(successCallback)
      .catch((e) => {
        console.error("Error adding document: ", e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { addData };
};
