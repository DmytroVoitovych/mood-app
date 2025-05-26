import { getAuth, User } from "firebase/auth";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { GlobalProfileState } from "~/composables/globalProfileState";
import { MoodForm } from "~/core/types/types";

export const useDataBaseByFirebase = () => {
  const db = getFirestore();
  const user = getAuth().currentUser;
  const { loading } = useGlobalLoadingState();

  const addData = (data: { [x in string]: MoodForm }, successCallback: () => void) => {
    if (!user?.uid) {
      console.error("User is not authenticated.");
      return Promise.reject(new Error("User is not authenticated."));
    }
    return addDoc(collection(db, "users", user.uid, "mood-data"), data)
      .then(successCallback)
      .catch((e) => {
        console.error("Error adding document: ", e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const syncData = (data: GlobalProfileState, user: User) => {
    if (!user?.uid) {
      console.error("User is not authenticated.");
      return Promise.reject(new Error("User is not authenticated."));
    }

    const checkProfileData = () => {
      const updatedFields = {
        avatar: user.photoURL || "",
        email: user.email || "",
        profileName: user.displayName || "",
      };

      for (const [key, value] of Object.entries(updatedFields)) {
        if (data.value[key as keyof typeof updatedFields] !== value) {
          data.value[key as keyof typeof updatedFields] = value;
        }
      }
    };

    getDocs(collection(getFirestore(), "users", user?.uid, "on-board"))
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          data.value.isAboard = true;
          checkProfileData();
        }
      })
      .catch((e) => console.log(e));

    getDocs(collection(getFirestore(), "users", user.uid, "mood-data"))
      .then((querySnapshot) => {
        const userMoodList = querySnapshot.docs.reduce((acc, doc) => {
          Object.assign(acc, doc.data());
          return acc;
        }, {});

        if (JSON.stringify(userMoodList) !== JSON.stringify(data.value.logData)) {
          data.value.logData = userMoodList;
        }
      })
      .catch((e) => console.log(e));
  };

  return { addData, syncData };
};
