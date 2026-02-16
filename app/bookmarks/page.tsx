'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Bookmark {
  id: number;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.log(error);
    else setBookmarks(data || []);
    setLoading(false);
  };

  const addBookmark = async () => {
    if (!title || !url) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ title, url, user_id: 'demo-user' }]);
    if (error) console.log(error);
    else {
      setBookmarks([...(data || []), ...bookmarks]);
      setTitle('');
      setUrl('');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookmarks</h1>

      {/* Add Bookmark Form */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addBookmark}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* Bookmarks List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">No bookmarks yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((b) => (
            <li key={b.id} className="p-4 border rounded-md flex justify-between items-center hover:shadow">
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium hover:underline"
              >
                {b.title}
              </a>
              <span className="text-gray-400 text-sm">{new Date(b.created_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
