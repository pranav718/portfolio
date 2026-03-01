export interface Book {
    title: string;
    author: string;
    cover: string;
    genre: string;
}

export const booksRead: Book[] = [
    {
        title: 'White Nights',
        author: 'Fyodor Dostoevsky',
        cover: '/images/books/white-nights.jpg',
        genre: 'literature',
    },
    {
        title: 'Metamorphosis',
        author: 'Franz Kafka',
        cover: '/images/books/metamorphosis.jpg',
        genre: 'literature',
    },
];

export const currentlyReading: Book[] = [
    {
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        cover: '/images/books/ddia.jpg',
        genre: 'tech',
    },
    {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        cover: '/images/books/crime-and-punishment.jpg',
        genre: 'literature',
    },
];
