import { useEffect } from 'react';

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = 'Movie Search';
    };
  }, [title]);

  return null;
}

export default PageTitle;