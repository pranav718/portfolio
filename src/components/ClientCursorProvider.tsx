'use client';

import { usePathname } from 'next/navigation';
import OrigamiCursor from './OrigamiCursor';

export default function ClientCursorProvider() {
    const pathname = usePathname();

    if (!pathname?.startsWith('/portfolio')) {
        return null;
    }

    return <OrigamiCursor />;
}
