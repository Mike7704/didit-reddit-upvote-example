"use client";

export default function GlobalError({ error }) {
  return (
    <html>
      <body>
        <div className="flex flex-col justify-center items-center text-center gap-5 p-5">
          <h2 className="text-xl font-bold">Error! Something went wrong...</h2>
          <p>{error.message}</p>

          {/* Using normal button rather than link because of this issue
      https://github.com/vercel/next.js/issues/48367 
      <Link className="ml-10 hover:bg-zinc-300 p-2 rounded bg-pink-300 text-black" href="/">
        Return to the home page
      </Link>
      */}
          <button className="hover:bg-zinc-300 p-2 rounded bg-pink-300 text-black" onClick={() => (window.location.href = "/")}>
            Return to the home page
          </button>
        </div>
      </body>
    </html>
  );
}
