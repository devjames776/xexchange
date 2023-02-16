import * as React from "react";
import Chart from "chart.js";
import { AdditionalContent, Content } from "components";

const SectionChart = ({ data }: { data: any }) => {
  const chartRef = React.useRef() as React.LegacyRef<HTMLCanvasElement>;
  const [chart, setChart] = React.useState<any>();

  const config = {
    type: "doughnut",
    data: data.chart.data,
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 55,
      legend: {
        display: false,
      },
      tooltips: {
        yPadding: 10,
        callbacks: {
          label: function (tooltipItem: any, tooltipData: any) {
            let total = 0;
            tooltipData.datasets[tooltipItem.datasetIndex].data.forEach(
              (element: any) => {
                total += element;
              },
            );
            const value =
              tooltipData.datasets[tooltipItem.datasetIndex].data[
                tooltipItem.index
              ];
            const percentTxt = Math.round((value / total) * 10000) / 100;
            return ` ${tooltipData.labels[tooltipItem.index]}: ${percentTxt}%`;
          },
        },
      },
    },
  };

  const buildChart = (instance: any) => () => {
    if (chartRef) {
      if (instance) {
        instance.destroy();
      }

      // tslint-disable-next-line
      const DisplayChart = new Chart((chartRef as any).current, config);
      setChart(DisplayChart);
    }
  };

  React.useEffect(buildChart(chart), []);

  return (
    <div
      className={`row section-chart ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, "")
          : ""
      }`}
    >
      <div className="col-md-4 order-md-last d-flex flex-column justify-content-center">
        {data.content && <Content content={data.content} />}
        {chart && (
          <ul
            className={`list-unstyled chart-legend-container py-0 my-3 sc-legend-chart-${chart.id}`}
          >
            {chart.legend.legendItems.map((item: any, index: number) => {
              const backgroundStyle =
                typeof item.fillStyle === "string"
                  ? item.lineDash && item.lineDash.length
                    ? `${item.strokeStyle}50`
                    : item.fillStyle
                  : `${item.strokeStyle}50`;
              const borderStyle =
                item.lineDash && item.lineDash.length > 0 ? "dotted" : "solid";
              const percentage = chart.config.data.datasets[0].data[index]
                ? `${chart.config.data.datasets[0].data[index]}% `
                : "";
              return (
                <li
                  className="sc-legend active pb-2"
                  key={item.datasetIndex + item.text}
                >
                  <span
                    className="sc-legend__label"
                    style={{
                      background: backgroundStyle,
                      border: `1px ${borderStyle} ${item.strokeStyle}`,
                      pointerEvents: "none",
                    }}
                  />
                  {percentage}
                  {item.text}
                </li>
              );
            })}
          </ul>
        )}
        {data.content && <AdditionalContent content={data.content} />}
      </div>
      <div className="col-md-8">
        <canvas width="288" height="288" ref={chartRef} />
      </div>
    </div>
  );
};

export default SectionChart;
