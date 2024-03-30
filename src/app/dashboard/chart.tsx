"use Client"
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: 'Total',
    },
  ],
  width: 400,
  height: 400,
};
const dataset = [
  {
    Total: 999,
    month: 'Jan',
  },
  {
    Total: 999,
    month: 'Fev',
  },
  {
    Total: 999,
    month: 'Mar',
  },
  {
    Total: 999,
    month: 'Apr',
  },
  {
    Total: 999,
    month: 'May',
  },
  {
    Total: 999,
    month: 'June',
  },
  {
    Total: 999,
    month: 'July',
  },
  {
    Total: 999,
    month: 'Aug',
  },
  {
    Total: 999,
    month: 'Sept',
  },
  {
    Total: 999,
    month: 'Oct',
  },
  {
    Total: 999,
    month: 'Nov',
  },
  {
    Total: 999,
    month: 'Dec',
  },
];

const valueFormatter = (value: number) => `${value}bath`;

const HorizontalBars = (props : any) => {
    const {totalmonth} = props
    
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'Total', label: 'Sales', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
export default HorizontalBars;
