'use client';

import { useEffect, useState } from 'react';

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionWeek {
    days: ContributionDay[];
}

interface GitHubContributionsProps {
    username: string;
}

export default function GitHubContributions({ username }: GitHubContributionsProps) {
    const [contributions, setContributions] = useState<ContributionWeek[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);

    useEffect(() => {
        async function fetchContributions() {
            try {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
                );
                const data = await response.json();

                if (data.contributions) {
                    const weeks: ContributionWeek[] = [];
                    let currentWeek: ContributionDay[] = [];
                    let calculatedTotal = 0;

                    data.contributions.forEach((day: { date: string; count: number; level: number }, index: number) => {
                        calculatedTotal += day.count;
                        currentWeek.push({
                            date: day.date,
                            count: day.count,
                            level: day.level
                        });

                        if (currentWeek.length === 7) {
                            weeks.push({ days: currentWeek });
                            currentWeek = [];
                        }
                    });

                    if (currentWeek.length > 0) {
                        weeks.push({ days: currentWeek });
                    }

                    setContributions(weeks);
                    const apiTotal = data.total?.['2026'] || data.total?.lastYear || calculatedTotal;
                    setTotalContributions(apiTotal);
                }
            } catch (error) {
                console.error('Failed to fetch GitHub contributions:', error);
                generateMockData();
            } finally {
                setLoading(false);
            }
        }

        function generateMockData() {
            const weeks: ContributionWeek[] = [];
            for (let w = 0; w < 52; w++) {
                const days: ContributionDay[] = [];
                for (let d = 0; d < 7; d++) {
                    const rand = Math.random();
                    let level = 0;
                    if (rand > 0.7) level = 4;
                    else if (rand > 0.5) level = 3;
                    else if (rand > 0.3) level = 2;
                    else if (rand > 0.15) level = 1;
                    days.push({ date: '', count: level * 2, level });
                }
                weeks.push({ days });
            }
            setContributions(weeks);
            setTotalContributions(847);
        }

        fetchContributions();
    }, [username]);

    const getLevelColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-white/5';
            case 1: return 'bg-green-500/30';
            case 2: return 'bg-green-500/50';
            case 3: return 'bg-green-500/75';
            case 4: return 'bg-green-500';
            default: return 'bg-white/5';
        }
    };

    if (loading) {
        return (
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
                    <div className="h-20 bg-white/5 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/50">
                    {totalContributions.toLocaleString()} contributions in the last year
                </span>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/40 hover:text-white transition-colors"
                >
                    @{username}
                </a>
            </div>
            <div className="overflow-x-auto">
                <div className="flex gap-[3px]" style={{ minWidth: 'max-content' }}>
                    {contributions.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                            {week.days.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(day.level)}`}
                                    title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/40">
                <span>Less</span>
                <div className="w-[10px] h-[10px] rounded-sm bg-white/5" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-500/30" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-500/50" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-500/75" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-500" />
                <span>More</span>
            </div>
        </div>
    );
}
