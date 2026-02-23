'use client';

import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ChartProps {
  title: string;
  data: Array<{ label: string; value: number; color: string }>;
  height?: number;
  showTrend?: boolean;
  trend?: string;
}

export function Chart({ title, data, height = 200, showTrend = false, trend }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-3d">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {title}
        </h3>
        {showTrend && trend && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
      
      <div className="relative" style={{ height }}>
        {/* Chart Bars */}
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
              style={{ height: '100%' }}
            >
              {/* Bar */}
              <div
                className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer hover:scale-105"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: `hsl(var(--${item.color}))`,
                }}
                title={`${item.label}: ${item.value}`}
              />
              
              {/* Label */}
              <div className="text-xs text-muted-foreground text-center mt-2">
                {item.label}
              </div>
              
              {/* Value */}
              <div className="text-xs font-medium text-foreground text-center">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProgressRingProps {
  value: number;
  max: number;
  label: string;
  color: string;
  size?: number;
}

export function ProgressRing({ value, max, label, color, size = 120 }: ProgressRingProps) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={45}
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={45}
            stroke={`hsl(var(--${color}))`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">of {max}</span>
        </div>
      </div>
      
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
