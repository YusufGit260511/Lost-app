import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../contexts/ToastContext";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const { notify } = useToast();

  useEffect(() => {
    const q = query(collection(db, "lostItems"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newPosts.length > posts.length) {
        const latest = newPosts[0];
        notify(`🆕 Новый пост: ${latest.itemName || "Неизвестный предмет"}`, "success");
      }

      setPosts(newPosts);
    });

    return () => unsubscribe();
  }, [posts, notify]);

  const toggleExpand = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto mt-[100px] py-10 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Потерянные предметы
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">Постов пока нет.</p>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => {
              const isExpanded = expandedPostId === post.id;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 border rounded-2xl shadow-md bg-white hover:shadow-xl hover:scale-[1.02] transition-transform cursor-pointer"
                  onClick={() => toggleExpand(post.id)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {post.itemName || "Без названия"}
                  </h3>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 space-y-2"
                    >
                      <p className="text-gray-600">{post.description || "Описание отсутствует"}</p>
                      <p className="text-gray-500 text-sm flex items-center">
                        📍 <span className="ml-1">{post.location || "Не указано"}</span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        📝 Submitted by: {post.yourName || "Неизвестно"} — {post.emailAddress || "Нет Email"}
                      </p>
                      {post.proofUrl && (
                        <img
                          src={post.proofUrl}
                          alt={post.itemName}
                          className="mt-2 rounded-lg max-h-64 w-full object-cover"
                        />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PostsPage;