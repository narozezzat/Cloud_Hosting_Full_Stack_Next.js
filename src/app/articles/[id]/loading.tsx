const SingleArticleLoading = () => {
  return (
    <section className="fix-height container w-full px-5 md:w-3/4 m-auto mt-8 animate-pulse">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="bg-gray-300 mb-2 h-6 rounded-lg"></h1>
        <div className="bg-gray-300 h-4 rounded-lg"></div>
        <p className="bg-gray-300 mt-5 h-6 rounded-lg"></p>
      </div>
      <div className="mt-8">
        <div className="p-2 rounded-lg bg-gray-300 h-10"></div>
        <button className="bg-gray-300 mt-2 p-1 rounded-lg h-8 w-20"></button>
      </div>
      <button className="bg-gray-300 p-1 mt-8 rounded-lg h-8 w-20"></button>
      <div className="bg-white p-2 rounded-lg mt-4">
        <div className="flex justify-between mb-2 items-center">
          <h1 className="bg-gray-300 mb-2 w-20 h-6 rounded-lg"></h1>
          <p className="bg-gray-300  mb-2 w-40 h-6 rounded-lg"></p>
        </div>
        <div className="bg-gray-300 h-4 w-full md:w-96 rounded-lg mb-2"></div>
        <div className="flex justify-end gap-2">
          <div className="bg-gray-300 h-4 w-4"></div>
          <div className="bg-gray-300 h-4 w-4"></div>
        </div>
      </div>
    </section>
  );
};

export default SingleArticleLoading;
