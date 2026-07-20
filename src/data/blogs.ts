export interface Blog {
    id: string;
    title: string;
    url: string;
    date: string;
    claps: number;
    tags: string[];
}

export const blogs: Blog[] = [
    {
        id: 'convex-terminaltype',
        title: 'Understanding Convex Through TerminalType: My Real-Time Typing App',
        url: 'https://medium.com/@knightkun/understanding-convex-through-terminaltype-my-real-time-typing-app-59af77041922',
        date: 'Oct 2025',
        claps: 151,
        tags: ['Convex', 'Realtime Applications', 'Backend Engineering'],
    },
    {
        id: 'udp-hole-punching-tsuna',
        title: 'UDP Hole Punching from Scratch in Golang: Building Tsuna',
        url: 'https://medium.com/@knightkun/udp-hole-punching-from-scratch-in-golang-building-tsuna-448ca66a733b',
        date: 'May 2026',
        claps: 55,
        tags: ['Golang', 'Networking', 'Peer To Peer', 'Systems Programming', 'Computer Science'],
    },
    {
        id: 'raft-consensus-go',
        title: 'Raft Consensus, Explained Simply (Then Built in Go)',
        url: 'https://medium.com/@knightkun/raft-consensus-explained-simply-then-built-in-go-f642531b6527',
        date: 'Jul 2026',
        claps: 10,
        tags: ['Golang', 'Distributed Systems', 'Raft', 'Backend'],
    },
];
