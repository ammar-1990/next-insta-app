const MiniProfile = () => {
  return (
    <div className="flex justify-between items-center mt-16">
      <img src="/assets/imageplaceholder.jpg" className="h-12 w-12 p-[1px]  object-cover rounded-full lg:mr-5 mr-1 cursor-pointer" alt="profile image" />

      <div className="flex-1">
        <p className="font-bold">Ammar</p>
        <p className="text-gray-400 text-sm font-semibold">
          Wlecome to Instagram
        </p>
      </div>

      <button className="text-blue-400">Sign Out</button>
    </div>
  );
};

export default MiniProfile;
