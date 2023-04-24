import { motion } from "framer-motion";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useModal } from "@/lib/ModalContext";
import { auth } from "@/firebase";
const Modal = () => {
  const { setModal } = useModal();
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);
const user = auth.currentUser

  const uploadPost = async (e) => {
    e.preventDefault();
    setLoading(true);
try{ 
    
    const docRef = await addDoc(collection(db, "posts"), {
    username: user.displayName,
    caption: caption,
    profileImg:
      user.photoURL ,
    timestamp: serverTimestamp(),
  });

  console.log(`new post added with ID ${docRef.id}`);

  const imageRef = ref(storage, `posts/${docRef.id}/image`);

  await uploadBytes(imageRef, selectedImage).then(
    async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
      console.log('image uploaded')
    }
  ).catch((err)=>console.log(err));



}
  catch(err){
    console.log(err)
  
  }
   
finally{
    setModal(false);
    setLoading(false);
    setSelectedImage(null);
  };
}

   

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-300/80 z-40 grid place-content-center"
    >
      <div className="px-7 py-12 lg:w-[450px] md:w-[350px] w-[250px] text-center bg-white flex flex-col items-center justify-center gap-8 rounded-md">
        <input
          type="file"
          hidden
          ref={imgRef}
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        {selectedImage ? (
          <img
            onClick={() => {
              setSelectedImage(null);
            }}
            src={URL.createObjectURL(selectedImage)}
            className="w-full object-contain max-h-[200px] cursor-pointer"
          />
        ) : (
          <CameraIcon
            className="h-12 text-red-600 w-12 rounded-full cursor-pointer bg-red-300 p-2"
            onClick={() => imgRef.current.click()}
          />
        )}

        <p className="font-bold w-full">Upload Photo</p>
        <form className="w-full">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="outline-none p-2 w-full text-center mb-7"
            type="text"
            placeholder="Please enter a caption..."
          />
          <button
            className={`bg-red-600 w-full py-3 rounded-md text-white disabled:opacity-60`}
            onClick={uploadPost}
            disabled={!selectedImage || loading}
          >
            {loading ? 'Uploading...' : 'Upload Post'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Modal;
