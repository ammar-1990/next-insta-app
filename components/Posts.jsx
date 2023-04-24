import { useEffect, useState } from "react";
import Post from "./Post";

import {collection,onSnapshot,orderBy,query} from "firebase/firestore";
import { db } from "@/firebase";
import { BallTriangle } from "react-loader-spinner";

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
if(!posts)
return (

  <div className="w-full h-full flex items-center justify-center">
  <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="black"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />
</div>
)
  return (
    <div className="mt-6">
      { posts?.map((el) => (
        <Post key={el.id} id={el.id} username={el.username} userImg={el.profileImg} caption={el.caption} img={el.image}/>
      ))  }
    </div>
  );
};

export default Posts;
