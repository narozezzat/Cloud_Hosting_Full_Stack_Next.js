interface SingleArticlePageProps {
    params: {
        id: string;
    }
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
    // const router = useRouter();

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }
    const article = await response.json();

    // const navigateBack = useCallback(() => {
    //     router.push(`/users${window?.location?.search}`);
    // }, [router]);

    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg">
                {/* <button
                    className="bg-gray-700 text-white px-3 py-1 rounded-lg"
                >
                    <IoMdArrowBack onClick={() => navigateBack()} />
                </button> */}
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {article.title}
                </h1>
                <div className="text-gray-400">1/1/2024</div>
                <p className="text-gray-800 text-xl mt-5">{article.body}</p>
            </div>
        </section >
    )
}

export default SingleArticlePage