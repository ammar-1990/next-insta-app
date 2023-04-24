import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main className="max-w-[1150px] mx-auto  grid grid-cols-1 md:grid-cols-3">
      <section className="md:col-span-2">
<Stories />
<Posts />

      </section>
      <section className="lg:px-6 px-2 hidden md:block">
        <div className="sticky top-[70px]">

        <MiniProfile />
        <Suggestions />
        </div>
      



      </section>
    </main>
  );
};

export default Feed;
