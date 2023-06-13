import { Button } from "@/components/ui/button";
import { type CalendarConfig } from "./types";

type CalendarToggleProps = {
  calendarConfig: CalendarConfig;
  checked?: boolean;
  toggleVisibility?: (calendarId: string) => void;
};

const CalendarToggle = ({
  calendarConfig,
  checked,
  toggleVisibility,
  ...props
}: CalendarToggleProps) => {
  return (
    <Button
      className={`${checked ? calendarConfig.color : "bg-black"} border-2`}
      onClick={() => {
        toggleVisibility && toggleVisibility(calendarConfig.id);
      }}
      {...props}
    >
      <span className="text-4xl">{calendarConfig.name}</span>
    </Button>
  );
};
export default CalendarToggle;
