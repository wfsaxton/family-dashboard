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
    <div
      className={`flex h-full rounded-lg border-2 border-white p-4 justify-center ${calendarConfig.color}`}
    >
      <label className="inline-flex items-center gap-4">
        <input
          className="h-10 w-10 rounded-md border-2 accent-white"
          type="checkbox"
          checked={checked ? checked : false}
          onChange={() => {
            toggleVisibility && toggleVisibility(calendarConfig.id);
          }}
          {...props}
        />
        <span className="text-4xl">{calendarConfig.name}</span>
      </label>
    </div>
  );
};
export default CalendarToggle;
