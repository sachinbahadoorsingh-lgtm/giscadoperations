'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-items');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!image || !link) return;
    setItems([...items, { id: Date.now(), image, link }]);
    setImage('');
    setLink('');
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const moveItem = (index: number, direction: number) => {
    const newItems = [...items];
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    setItems(newItems);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <h1>My Tool Dashboard</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />
        <input
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />
        <button onClick={addItem} style={{ padding: "10px 20px" }}>
          Add
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {items.map((item, index) => (
          <div key={item.id} style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <a href={item.link} target="_blank">
              <img src={item.image} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            </a>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => moveItem(index, -1)}>↑</button>
                <button onClick={() => moveItem(index, 1)}>↓</button>
              </div>
              <button onClick={() => removeItem(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
