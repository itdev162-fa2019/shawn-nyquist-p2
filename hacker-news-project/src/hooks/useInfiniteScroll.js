import { useState, useEffect, memo } from 'react';
import { STORY_INCREMENT, MAX_STORIES } from '../constants';
import { debounce } from '../utilities/debounce';

export const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENT);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return false;
    }

    setLoading(true);
  }, 500);

  useEffect(() => {
    // If nothing loads, it returns  
    if (!loading) return;

    // If the count with the increment number is greater than max stories it will stop at max
    if (count + STORY_INCREMENT >= MAX_STORIES) {
      setCount(MAX_STORIES);
    } else {
      setCount(count + STORY_INCREMENT);
    }

    setLoading(false);
  }, [loading]);


  // Scroll Listener  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { count };
};


