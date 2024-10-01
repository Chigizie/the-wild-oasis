import styled from "styled-components";
import DashboardBox from "./DashboardBox";

import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import Spinner from "../../ui/Spinner";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays, isLoading1 }) {
  const { isDarkMode } = useDarkMode();

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  if (isLoading1) return <Spinner />;
  const data = allDays.map((date) => {
    return {
      label: format(date, "MMM dd"),

      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),

      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  const colors = !isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays[0], "MMM dd yyy")} &mdash;{" "}
        {format(allDays.at(-1), "MMM dd yyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data} height={300} width={700}>
          <CartesianGrid strokeDasharray={4} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          ></Area>
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          ></Area>
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
