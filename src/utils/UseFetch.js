import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
          try {
            setLoading(true);
            const response = await axios.get(url);
            setPost(response.data);
            setLoading(false);
          } catch (err) {
            setError("Failed");
            setLoading(false);
            console.error("Error:", err);
          }
        };
    
        fetchPost();
      }, [url]);

      return {loading, error, post}
}

export default useFetch