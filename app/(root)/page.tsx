import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
  const scriptURL = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1 ">
          <TradingViewWidget
            title="Market Overview"
            scriptURL={`${scriptURL}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptURL={`${scriptURL}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1 ">
          <TradingViewWidget
            scriptURL={`${scriptURL}market-quotes.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            scriptURL={`${scriptURL}timeline.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
      </section>
    </div>
  );
};
export default Home;
