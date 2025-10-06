"use client";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";
import { memo } from "react";

function TradingViewWidget({
  title,
  scriptURL,
  config,
  height,
  className,
}: {
  title?: string;
  scriptURL: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}) {
  const containerRef = useTradingViewWidget(scriptURL, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-100">{title}</h3>
      )}
      <div
        className={cn("tradingview-widget-container", className)}
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
