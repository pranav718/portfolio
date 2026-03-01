export interface Book {
    title: string;
    author: string;
    cover: string;
    genre: string;
    goodreadsUrl: string;
}

export const booksRead: Book[] = [
    {
        title: 'White Nights',
        author: 'Fyodor Dostoevsky',
        cover: '/images/books/white-nights.jpg',
        genre: 'literature',
        goodreadsUrl: 'https://www.goodreads.com/book/show/1772910.White_Nights',
    },
    {
        title: 'Metamorphosis',
        author: 'Franz Kafka',
        cover: '/images/books/metamorphosis.jpg',
        genre: 'literature',
        goodreadsUrl: 'https://www.goodreads.com/book/show/485894.The_Metamorphosis',
    },
];

export const currentlyReading: Book[] = [
    {
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        cover: '/images/books/ddia.jpg',
        genre: 'tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications',
    },
    {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        cover: '/images/books/crime-and-punishment.jpg',
        genre: 'literature',
        goodreadsUrl: 'https://www.goodreads.com/book/show/7144.Crime_and_Punishment',
    },
];
