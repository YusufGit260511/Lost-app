import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "lostItems"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Потерянные предметы</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">Постов пока нет.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold">{post.itemName}</h3>
              <p className="text-gray-700">{post.description}</p>
              <p className="text-gray-500 text-sm">📍 {post.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;