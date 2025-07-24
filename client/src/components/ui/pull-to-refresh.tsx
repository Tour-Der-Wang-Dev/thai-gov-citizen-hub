import React, { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
}

export function PullToRefresh({ 
  children, 
  onRefresh, 
  threshold = 70,
  className 
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0 && window.scrollY === 0) {
      setIsPulling(true);
      setPullDistance(Math.min(diff, threshold * 1.5));
      
      if (diff > threshold) {
        e.preventDefault();
      }
    }
  }, [threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setIsPulling(false);
    setPullDistance(0);
  }, [pullDistance, threshold, onRefresh]);

  const refreshOpacity = Math.min(pullDistance / threshold, 1);
  const iconRotation = (pullDistance / threshold) * 180;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 bg-background/80 backdrop-blur-sm"
        style={{
          height: Math.min(pullDistance, threshold),
          opacity: refreshOpacity,
        }}
      >
        <RefreshCw
          className={cn(
            "h-6 w-6 text-government-green transition-transform duration-200",
            isRefreshing && "animate-spin"
          )}
          style={{
            transform: `rotate(${iconRotation}deg)`,
          }}
        />
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${Math.min(pullDistance * 0.5, threshold * 0.5)}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}