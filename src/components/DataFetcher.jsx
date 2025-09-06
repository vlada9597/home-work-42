import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";

const DataFetcher = ({ url, id }) => {
  const [data, setData] = useState(null);       // дані
  const [loading, setLoading] = useState(true); // стан завантаження
  const [error, setError] = useState(null);     // помилка

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchData(url, id);
        setData(result);
      } catch (err) {
        setError("❌ Помилка завантаження даних");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url, id]); // виклик при зміні url або id

  // --- умовний рендеринг ---
  if (loading) return <p>⏳ Завантаження даних...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Дані відсутні</p>;

  // якщо прийшов масив → відобразимо список
  if (Array.isArray(data)) {
    return (
      <div>
        <h2>Отримані дані:</h2>
        <ul>
          {data.slice(0, 5).map(({ id, title, body }) => (
            <li key={id}>
              <strong>{title}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // якщо прийшов об’єкт
  const { id: itemId, title, body } = data;
  return (
    <div>
      <h2>Отриманий елемент:</h2>
      <p><b>ID:</b> {itemId}</p>
      {title && <p><b>Заголовок:</b> {title}</p>}
      {body && <p><b>Текст:</b> {body}</p>}
    </div>
  );
};

export default DataFetcher;
