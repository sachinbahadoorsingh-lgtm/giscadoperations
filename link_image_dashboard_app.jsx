"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dashboard-items");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!image || !link) return;
    setItems([...items, { id: Date.now(), image, link }]);
    setImage("");
    setLink("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const moveItem = (index, direction) => {
    const newItems = [...items];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    [newItems[index], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[index],
    ];
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Tool Dashboard</h1>

        <Card className="mb-8 shadow-xl rounded-2xl">
          <CardContent className="p-6 grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Input
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button onClick={addItem} className="rounded-2xl">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Card className="rounded-2xl shadow-lg overflow-hidden">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.image}
                    alt="dashboard item"
                    className="w-full h-40 object-cover"
                  />
                </a>
                <CardContent className="flex justify-between p-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveItem(index, -1)}
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveItem(index, 1)}
                    >
                      ↓
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
