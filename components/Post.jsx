import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { db } from "@/firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const user = auth.currentUser;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes]=useState([])
  const [hasLiked,setHasLiked]=useState(false)

  useEffect(()=>{
    const q = query(
        collection(db, "posts", id, "likes")
       
      );
  
      const unsub = onSnapshot(
        q,
        (querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
     
            list.push({ id: doc.id, ...doc.data() });
          });
  
          
          setLikes(list);
  
          
          
        },
        (error) => {
          console.log(error);
        }
      );
      return unsub;

  },[])


  useEffect(()=>{
setHasLiked(likes.findIndex(like=>like.id ===user.uid) !== -1)
  },[likes])

  useEffect(() => {
    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setComments(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return unsub;
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    const theComment = comment;
    setComment("");
    try {
      await addDoc(collection(db, "posts", id, "comments"), {
        comment: theComment,
        timestamp: serverTimestamp(),
        username: user.displayName,
        userImg: user.photoURL,
      });
    } catch (err) {
      console.log(err);
    }
  };
const setLike = async()=>{

    if(hasLiked){
        await deleteDoc(doc(db,'posts',id,'likes',user.uid))

    }
    else {
        try{

            await setDoc(doc(db,'posts',id,"likes",user.uid),{
                name:user.displayName
            })
        }
        catch(err){
            console.log(err)
        }
    }
   

}
  return (
    <div className="border mb-4">
      {/* Header */}
      <div className="p-4 flex items-center">
        <img
          src={userImg}
          className="w-11 h-11 rounded-full border-2 p-[1px] object-cover mr-4 cursor-pointer"
          alt="user img"
        />
        <p className="flex-1 font-semibold capitalize">{username}</p>
        <EllipsisVerticalIcon className="h-6 text-gray-600 cursor-pointer" />
      </div>
      {/* Image */}
      <img
        src={img}
        className="w-full object-contain cursor-pointer"
        alt="image"
      />

      {/* body */}

      <div className="flex justify-between items-center pt-2 px-2">
        <div className="flex gap-3">
         { hasLiked? <FilledHeart onClick={setLike} className="postIcon text-red-500"   /> : <HeartIcon onClick={setLike} className="postIcon" />}
          <PaperAirplaneIcon className="postIcon" />
          <ChatBubbleLeftEllipsisIcon className="postIcon" />
        </div>

        <BookmarkIcon className="postIcon" />
      </div>

      {/* caption */}
      
      <div className="p-2">
      {likes.length > 0 && <p className="font-semibold py-2">{likes.length} like(s)</p>}
        <p className="truncate">
          <span className="font-semibold capitalize">{username} </span>
          {caption}
        </p>
      </div>
     
        {comments?.length>0&&<div className="ml-10 h-20 overflow-y-scroll myScroll mt-1">
          {comments.map((comment) => (
            <div className="flex gap-1 items-center mb-1" key={comment.id}>
               
              <img className="w-8 h-8 p-[0.5px] border-2 cursor-pointer rounded-full object-cover" src={comment.userImg} alt="" />
              <p className="flex-1" ><span className="font-bold capitalize text-sm sm:text-base">{comment.username}</span> <span className="text-sm">{comment.comment}</span></p>
            <Moment className="pr-4 text-xs" fromNow>{comment.timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
     }

      {/* input */}
      <form className="flex p-4 items-center">
        <FaceSmileIcon className="postIcon" />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          className="border-none outline-none flex-1 p-y px-3"
          placeholder="Add a comment..."
        />
        <button
          onClick={addComment}
          disabled={!comment.trim()}
          className="text-blue-400 disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
