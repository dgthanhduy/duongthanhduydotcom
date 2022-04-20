import { useEffect, useState } from "react";

import { firestore } from "../../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Comment from "./Comment";

const CommentList = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "comments"),
      where("slug", "==", slug)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ ...doc.data(), id: doc.id });
      });
      setComments(newData);
    });

    return () => unsub();
  }, [slug]);

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentList;
