export interface Book {
    title: string;
    author: string;
    cover: string;
}

export const booksRead: Book[] = [
    {
        title: 'White Nights',
        author: 'Fyodor Dostoevsky',
        cover: '/images/books/white-nights.jpg',
    },
    {
        title: 'Metamorphosis',
        author: 'Franz Kafka',
        cover: '/images/books/metamorphosis.jpg',
    },
];

export const currentlyReading: Book[] = [
    {
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        cover: '/images/books/ddia.jpg',
    },
    {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        cover: '/images/books/crime-and-punishment.jpg',
    },
];
