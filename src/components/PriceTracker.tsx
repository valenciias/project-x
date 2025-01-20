import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

export default function PriceTracker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "BINANCE:BTCUSDT",
      "width": "100%",
      "height": 220,
      "locale": "en",
      "dateRange": "12M",
      "colorTheme": "dark",
      "trendLineColor": "#37a169",
      "underLineColor": "rgba(55, 161, 105, 0.15)",
      "isTransparent": true,
      "autosize": true,
      "largeChartUrl": ""
    });

    if (container.current) {
      const widget = document.createElement("div");
      widget.className = "tradingview-widget-container";
      widget.appendChild(script);
      container.current.appendChild(widget);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <Card className="w-full bg-background/50 backdrop-blur">
      <CardContent className="p-6">
        <div className="w-full h-[400px]" >
          <iframe height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed" src="https://www.geckoterminal.com/solana/pools/44W73kGYQgXCTNkGxUmHv8DDBPCxojBcX49uuKmbFc9U?embed=1&info=1&swaps=1&grayscale=1&light_chart=0" frameBorder="0" allow="clipboard-write" allowFullScreen></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
