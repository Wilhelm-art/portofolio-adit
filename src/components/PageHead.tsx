import { useEffect } from 'react';

interface PageHeadProps {
  title: string;
  description?: string;
}

export function PageHead({ title, description }: PageHeadProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return null;
}
