import React, { useState, useEffect } from 'react';
import { Library, Search, BookOpen, Bookmark } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function StudentLibrary() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  const loadBooks = () => {
    fetchAPI('/academics/library')
      .then(res => res.success && setBooks(res.books))
      .catch(console.error);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleReserve = async (book) => {
    try {
      const res = await fetchAPI('/academics/library/reserve', {
        method: 'POST',
        body: JSON.stringify({ bookId: book.id, studentId: 'USR-STU-001' })
      });
      if (res.success) {
        addToast(`Reserved "${book.title}"! Collect from Central Library Counter 2.`, 'success');
        loadBooks();
      }
    } catch (err) {
      addToast(err.message || 'Error reserving book', 'error');
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Library className="w-4 h-4 text-blue-700" />
            <span>Koha / Open-Source Digital Library OPAC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Digital Library & NCERT E-Resources
          </h1>
          <p className="text-xs text-slate-500">
            Over 12,000 physical volumes and 5,000+ indexed digital resources
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, author, subject..."
            className="pl-10 text-xs"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <Card key={book.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cbse-light text-cbse-blue font-mono">
                  {book.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  book.available > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {book.available} / {book.total} Available
                </span>
              </div>

              <CardTitle className="text-sm leading-snug">
                {book.title}
              </CardTitle>
              <p className="text-xs text-slate-500">By: {book.author}</p>
            </CardHeader>

            <CardContent className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2 mt-auto">
              {book.isDigital && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Opening digital NCERT e-book reader for: ${book.title}`)}
                  className="flex-1 text-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  Read E-Book
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => handleReserve(book)}
                disabled={book.available <= 0}
                className="flex-1 bg-cbse-navy hover:bg-cbse-blue text-white text-xs"
              >
                <Bookmark className="w-3.5 h-3.5 mr-1 text-cbse-gold" />
                Reserve Copy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
