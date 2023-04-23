import Post from "./Post"


const Posts = () => {


const posts=[
    {
        id:'1',
        username:'Jack',
        userImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/600px-Pierre-Person.jpg',
        img:'https://whyy.org/wp-content/uploads/2019/12/bright-daylight-environment-forest-240040-1-768x512.jpg',
        caption:'beautiful nature,let"s go for a walk in such weather',
      
    },
    {
        id:'2',
        username:'rock',
        userImg:'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
        img:'https://images.pexels.com/photos/1179225/pexels-photo-1179225.jpeg?auto=compress&cs=tinysrgb&w=600',
        caption:'very nice river let us make sport and run all the day !!!',
      
    },
]

  return (
    <div className="mt-6">

{posts.map(el=><Post key={1} {...el} />)}

    </div>
  )
}

export default Posts