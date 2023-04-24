import { useEffect, useState } from "react";
import Post from "./Post";

import {collection,onSnapshot,orderBy,query} from "firebase/firestore";
import { db } from "@/firebase";

const Posts = () => {


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db,"posts"),orderBy("timestamp", "desc"))
   
    
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
      
       
        let list =[];
       querySnapshot.forEach(doc=>{
         list.push({id:doc.id,...doc.data()})
     
        })
        
     setPosts(list)
   
      },
      (error) => {
        console.log(error);
      }
    );
    return  unsub;
    
  }, []);

  return (
    <div className="mt-6">
      {posts?.map((el) => (
        <Post key={el.id} username={el.username} userImg={el.profileImg} caption={el.caption} img={el.image}/>
      ))}
    </div>
  );
};

export default Posts;
