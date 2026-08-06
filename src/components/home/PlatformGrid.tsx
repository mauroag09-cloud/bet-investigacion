'use client';

import { useEffect, useState } from 'react';

export const PlatformGrid = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/plataformas?_t=' + new Date().getTime())
      .then(res => res.json())
      .then(data => {
        setPlatforms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Plataformas (datos brutos):</h2>
      <pre>{JSON.stringify(platforms, null, 2)}</pre>
    </div>
  );
};
